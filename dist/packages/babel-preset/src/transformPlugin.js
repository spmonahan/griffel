"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformPlugin = void 0;
const core_1 = require("@babel/core");
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const babel_preset_1 = require("@linaria/babel-preset");
const shaker_1 = require("@linaria/shaker");
const core_2 = require("@griffel/core");
const path = require("path");
const normalizeStyleRules_1 = require("./assets/normalizeStyleRules");
const replaceAssetsWithImports_1 = require("./assets/replaceAssetsWithImports");
const astify_1 = require("./utils/astify");
const evaluatePaths_1 = require("./utils/evaluatePaths");
const validateOptions_1 = require("./validateOptions");
function getDefinitionPathFromCallExpression(functionKind, callExpression) {
    const argumentPaths = callExpression.get('arguments');
    const hasValidArguments = Array.isArray(argumentPaths) && argumentPaths.length === 1;
    if (!hasValidArguments) {
        throw callExpression.buildCodeFrameError(`${functionKind}() function accepts only a single param`);
    }
    const definitionsPath = argumentPaths[0];
    if (definitionsPath.isExpression() || definitionsPath.isSpreadElement()) {
        return definitionsPath;
    }
    throw definitionsPath.buildCodeFrameError(`${functionKind}() function accepts only expressions and spreads`);
}
/**
 * Gets a kind of passed callee.
 */
function getCalleeFunctionKind(path, modules) {
    for (const module of modules) {
        if (path.referencesImport(module.moduleSource, module.importName)) {
            return 'makeStyles';
        }
        if (path.referencesImport(module.moduleSource, module.resetImportName || 'makeResetStyles')) {
            return 'makeResetStyles';
        }
    }
    return null;
}
/**
 * Checks if import statement import makeStyles().
 */
function hasMakeStylesImport(path, modules) {
    return Boolean(modules.find(module => path.node.source.value === module.moduleSource));
}
/**
 * Checks that passed declarator imports makesStyles().
 *
 * @example react_make_styles_1 = require('@griffel/react')
 */
function isRequireDeclarator(path, modules) {
    const initPath = path.get('init');
    if (!initPath.isCallExpression()) {
        return false;
    }
    if (initPath.get('callee').isIdentifier({ name: 'require' })) {
        const args = initPath.get('arguments');
        if (Array.isArray(args) && args.length === 1) {
            const moduleNamePath = args[0];
            if (moduleNamePath.isStringLiteral()) {
                return Boolean(modules.find(module => moduleNamePath.node.value === module.moduleSource));
            }
        }
    }
    return false;
}
/**
 * Rules that are returned by `resolveStyles()` are not deduplicated.
 * It's critical to filter out duplicates for build-time transform to avoid duplicated rules in a bundle.
 */
function dedupeCSSRules(cssRules) {
    Object.keys(cssRules).forEach(styleBucketName => {
        cssRules[styleBucketName] = cssRules[styleBucketName].filter((rule, index, rules) => rules.indexOf(rule) === index);
    });
    return cssRules;
}
exports.transformPlugin = (0, helper_plugin_utils_1.declare)((api, options) => {
    api.assertVersion(7);
    const pluginOptions = Object.assign({ babelOptions: {}, modules: [
            { moduleSource: '@griffel/react', importName: 'makeStyles' },
            { moduleSource: '@fluentui/react-components', importName: 'makeStyles' },
        ], evaluationRules: [
            { action: shaker_1.default },
            {
                test: /[/\\]node_modules[/\\]/,
                action: 'ignore',
            },
        ], projectRoot: process.cwd() }, options);
    (0, validateOptions_1.validateOptions)(pluginOptions);
    return {
        name: '@griffel/babel-plugin-transform',
        pre() {
            this.importDeclarationPaths = [];
            this.definitionPaths = [];
            this.calleePaths = [];
        },
        visitor: {
            Program: {
                enter(programPath, state) {
                    if (typeof state.filename === 'undefined') {
                        throw new Error([
                            '@griffel/babel-preset: This preset requires "filename" option to be specified by Babel. ',
                            "It's automatically done by Babel and our loaders/plugins. ",
                            "If you're facing this issue, please check your setup.\n\n",
                            'See: https://babeljs.io/docs/en/options#filename',
                        ].join(''));
                    }
                    // Invalidate cache for module evaluation to get fresh modules
                    babel_preset_1.Module.invalidate();
                },
                exit(programPath, state) {
                    if (state.importDeclarationPaths.length === 0 && !state.requireDeclarationPath) {
                        return;
                    }
                    if (state.definitionPaths) {
                        // Runs Babel AST processing or module evaluation for Node once for all arguments of makeStyles() calls once
                        (0, evaluatePaths_1.evaluatePaths)(programPath, state.file.opts.filename, state.definitionPaths.map(p => p.path), pluginOptions);
                        state.definitionPaths.forEach(definitionPath => {
                            const callExpressionPath = definitionPath.path.findParent(parentPath => parentPath.isCallExpression());
                            const evaluationResult = definitionPath.path.evaluate();
                            if (!evaluationResult.confident) {
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                const deoptPath = evaluationResult.deopt;
                                throw (deoptPath || definitionPath.path).buildCodeFrameError('Evaluation of a code fragment failed, this is a bug, please report it');
                            }
                            if (definitionPath.functionKind === 'makeStyles') {
                                const stylesBySlots = evaluationResult.value;
                                const [classnamesMapping, cssRulesByBucket] = (0, core_2.resolveStyleRulesForSlots)(
                                // Heads up!
                                // Style rules should be normalized *before* they will be resolved to CSS rules to have deterministic
                                // results across different build targets.
                                (0, normalizeStyleRules_1.normalizeStyleRules)(path, pluginOptions.projectRoot, 
                                // Presence of "state.filename" is validated on `Program.enter()`
                                state.filename, stylesBySlots));
                                const uniqueCSSRules = dedupeCSSRules(cssRulesByBucket);
                                callExpressionPath.get('arguments.0').remove();
                                callExpressionPath.pushContainer('arguments', [(0, astify_1.astify)(classnamesMapping), (0, astify_1.astify)(uniqueCSSRules)]);
                            }
                            if (definitionPath.functionKind === 'makeResetStyles') {
                                const styles = evaluationResult.value;
                                const [ltrClassName, rtlClassName, cssRules] = (0, core_2.resolveResetStyleRules)(
                                // Heads up!
                                // Style rules should be normalized *before* they will be resolved to CSS rules to have deterministic
                                // results across different build targets.
                                (0, normalizeStyleRules_1.normalizeStyleRules)(path, pluginOptions.projectRoot, 
                                // Presence of "state.filename" is validated on `Program.enter()`
                                state.filename, styles));
                                callExpressionPath.get('arguments.0').remove();
                                callExpressionPath.pushContainer('arguments', [
                                    (0, astify_1.astify)(ltrClassName),
                                    (0, astify_1.astify)(rtlClassName),
                                    (0, astify_1.astify)(cssRules),
                                ]);
                            }
                            (0, replaceAssetsWithImports_1.replaceAssetsWithImports)(pluginOptions.projectRoot, state.filename, programPath, callExpressionPath);
                        });
                    }
                    state.importDeclarationPaths.forEach(importDeclarationPath => {
                        const specifiers = importDeclarationPath.get('specifiers');
                        const source = importDeclarationPath.get('source');
                        specifiers.forEach(specifier => {
                            if (specifier.isImportSpecifier()) {
                                const importedPath = specifier.get('imported');
                                for (const module of pluginOptions.modules) {
                                    if (module.moduleSource !== source.node.value) {
                                        // 👆 "moduleSource" should match "importDeclarationPath.source" to skip unrelated ".importName"
                                        continue;
                                    }
                                    if (importedPath.isIdentifier({ name: module.importName })) {
                                        specifier.replaceWith(core_1.types.identifier('__styles'));
                                    }
                                    else if (importedPath.isIdentifier({ name: module.resetImportName || 'makeResetStyles' })) {
                                        specifier.replaceWith(core_1.types.identifier('__resetStyles'));
                                    }
                                }
                            }
                        });
                    });
                    if (state.calleePaths) {
                        state.calleePaths.forEach(calleePath => {
                            if (calleePath.node.name === 'makeResetStyles') {
                                calleePath.replaceWith(core_1.types.identifier('__resetStyles'));
                                return;
                            }
                            calleePath.replaceWith(core_1.types.identifier('__styles'));
                        });
                    }
                },
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            ImportDeclaration(path, state) {
                if (hasMakeStylesImport(path, pluginOptions.modules)) {
                    state.importDeclarationPaths.push(path);
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            VariableDeclarator(path, state) {
                if (isRequireDeclarator(path, pluginOptions.modules)) {
                    state.requireDeclarationPath = path;
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            CallExpression(path, state) {
                /**
                 * Handles case when `makeStyles()` is `CallExpression`.
                 *
                 * @example makeStyles({})
                 */
                if (state.importDeclarationPaths.length === 0) {
                    return;
                }
                const calleePath = path.get('callee');
                if (calleePath.isIdentifier()) {
                    const functionKind = getCalleeFunctionKind(calleePath, pluginOptions.modules);
                    if (functionKind) {
                        state.definitionPaths.push({
                            functionKind,
                            path: getDefinitionPathFromCallExpression(functionKind, path),
                        });
                        state.calleePaths.push(calleePath);
                    }
                }
            },
            // eslint-disable-next-line @typescript-eslint/naming-convention
            MemberExpression(expressionPath, state) {
                /**
                 * Handles case when `makeStyles()` is inside `MemberExpression`.
                 *
                 * @example module.makeStyles({})
                 */
                if (!state.requireDeclarationPath) {
                    return;
                }
                const objectPath = expressionPath.get('object');
                const propertyPath = expressionPath.get('property');
                if (!objectPath.isIdentifier({ name: state.requireDeclarationPath.node.id.name })) {
                    return;
                }
                let functionKind = null;
                if (propertyPath.isIdentifier({ name: 'makeStyles' })) {
                    functionKind = 'makeStyles';
                }
                else if (propertyPath.isIdentifier({ name: 'makeResetStyles' })) {
                    functionKind = 'makeResetStyles';
                }
                if (!functionKind) {
                    return;
                }
                const parentPath = expressionPath.parentPath;
                if (!parentPath.isCallExpression()) {
                    return;
                }
                state.definitionPaths.push({
                    functionKind,
                    path: getDefinitionPathFromCallExpression(functionKind, parentPath),
                });
                state.calleePaths.push(propertyPath);
            },
        },
    };
});
//# sourceMappingURL=transformPlugin.js.map