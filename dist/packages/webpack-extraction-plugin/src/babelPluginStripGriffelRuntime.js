"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.babelPluginStripGriffelRuntime = exports.transformUrl = void 0;
const core_1 = require("@babel/core");
const helper_plugin_utils_1 = require("@babel/helper-plugin-utils");
const core_2 = require("@griffel/core");
const path = require("path");
function transformUrl(filename, resourceDirectory, assetPath) {
    // Get the absolute path to the asset from the path relative to the JS file
    const absoluteAssetPath = path.resolve(path.dirname(filename), assetPath);
    // Replace asset path with new path relative to the output CSS
    const relativeAssetPath = path.relative(resourceDirectory, absoluteAssetPath);
    // Normalize paths to be POSIX-like as bundlers don't handle Windows paths
    // "path.posix" does not make sense there as there is no "windows-to-posix-path" function
    return relativeAssetPath.split(path.sep).join(path.posix.sep);
}
exports.transformUrl = transformUrl;
exports.babelPluginStripGriffelRuntime = (0, helper_plugin_utils_1.declare)((api, options) => {
    api.assertVersion(7);
    return {
        name: '@griffel/webpack-extraction-plugin/babel',
        pre() {
            this.cssRules = [];
        },
        post() {
            this.file.metadata.cssRules = this.cssRules;
        },
        visitor: {
            Program: {
                enter(path, state) {
                    if (typeof options.resourceDirectory === 'undefined') {
                        throw new Error([
                            '@griffel/webpack-extraction-plugin: This plugin requires "resourceDirectory" option to be specified. ',
                            "It's automatically done by our loaders. ",
                            "If you're facing this issue, please check your setup.\n\n",
                            'See: https://babeljs.io/docs/en/options#filename',
                        ].join(''));
                    }
                    if (typeof state.filename === 'undefined') {
                        throw new Error([
                            '@griffel/webpack-extraction-plugin: This plugin requires "filename" option to be specified by Babel. ',
                            "It's automatically done by our loaders. ",
                            "If you're facing this issue, please check your setup.\n\n",
                            'See: https://babeljs.io/docs/en/options#filename',
                        ].join(''));
                    }
                },
                exit(path, state) {
                    path.traverse({
                        ImportSpecifier(path) {
                            const importedPath = path.get('imported');
                            let functionKind;
                            if (importedPath.isIdentifier({ name: '__styles' })) {
                                functionKind = '__styles';
                            }
                            else if (importedPath.isIdentifier({ name: '__resetStyles' })) {
                                functionKind = '__resetStyles';
                            }
                            else {
                                return;
                            }
                            const declarationPath = path.findParent(p => p.isImportDeclaration());
                            if (declarationPath === null) {
                                throw path.buildCodeFrameError([
                                    'Failed to find "ImportDeclaration" path for an "ImportSpecifier".',
                                    'Please report a bug (https://github.com/microsoft/griffel/issues) if this error happens',
                                ].join(' '));
                            }
                            if (functionKind === '__styles') {
                                declarationPath.pushContainer('specifiers', core_1.types.identifier('__css'));
                            }
                            if (functionKind === '__resetStyles') {
                                declarationPath.pushContainer('specifiers', core_1.types.identifier('__resetCSS'));
                            }
                        },
                        /**
                         * Visits all call expressions (__styles function calls):
                         * - replaces "__styles" calls "__css"
                         * - removes CSS rules from "__styles" calls
                         */
                        CallExpression(path) {
                            const calleePath = path.get('callee');
                            const argumentPaths = path.get('arguments');
                            let argumentPath;
                            let functionKind;
                            if (calleePath.isIdentifier({ name: '__styles' })) {
                                argumentPath = argumentPaths[1];
                                functionKind = '__styles';
                                calleePath.replaceWith(core_1.types.identifier('__css'));
                            }
                            else if (calleePath.isIdentifier({ name: '__resetStyles' })) {
                                argumentPath = argumentPaths[2];
                                functionKind = '__resetStyles';
                                calleePath.replaceWith(core_1.types.identifier('__resetCSS'));
                            }
                            else {
                                return;
                            }
                            if ((functionKind === '__styles' && argumentPaths.length !== 2) ||
                                (functionKind === '__resetStyles' && argumentPaths.length !== 3)) {
                                throw calleePath.buildCodeFrameError([
                                    `"${functionKind}" function call should have exactly ${argumentPaths.length} arguments.`,
                                    'Please report a bug (https://github.com/microsoft/griffel/issues) if this error happens',
                                ].join(' '));
                            }
                            argumentPath.traverse({
                                TemplateLiteral(literalPath) {
                                    const expressionPaths = literalPath.get('expressions');
                                    expressionPaths.map(expressionPath => {
                                        if (Array.isArray(expressionPath) || !expressionPath.isIdentifier()) {
                                            throw literalPath.buildCodeFrameError([
                                                'A template literal with an imported asset should contain an expression statement.',
                                                'Please report a bug (https://github.com/microsoft/griffel/issues) if this error happens',
                                            ].join(' '));
                                        }
                                        const expressionName = expressionPath.node.name;
                                        const expressionBinding = literalPath.scope.getBinding(expressionName);
                                        if (typeof expressionBinding === 'undefined') {
                                            throw expressionPath.buildCodeFrameError([
                                                'Failed to resolve a binding in a scope for an identifier.',
                                                'Please report a bug (https://github.com/microsoft/griffel/issues) if this error happens',
                                            ].join(' '));
                                        }
                                        const importDeclarationPath = expressionBinding.path.findParent(p => p.isImportDeclaration());
                                        if (importDeclarationPath === null) {
                                            throw expressionBinding.path.buildCodeFrameError([
                                                'Failed to resolve an import for the identifier.',
                                                'Please report a bug (https://github.com/microsoft/griffel/issues) if this error happens',
                                            ].join(' '));
                                        }
                                        expressionPath.replaceWith(core_1.types.stringLiteral(
                                        // When imports are inlined, we need to adjust the relative paths inside url(..) expressions
                                        // to allow css-loader resolve an imported asset properly
                                        transformUrl(state.filename, options.resourceDirectory, importDeclarationPath.get('source').node.value)));
                                        importDeclarationPath.remove();
                                    });
                                },
                            });
                            // Returns the styles as a JavaScript object
                            const evaluationResult = argumentPath.evaluate();
                            if (!evaluationResult.confident) {
                                throw argumentPath.buildCodeFrameError([
                                    `Failed to evaluate CSS rules from "${functionKind}" call.`,
                                    'Please report a bug (https://github.com/microsoft/griffel/issues) if this error happens',
                                ].join(' '));
                            }
                            if (functionKind === '__styles') {
                                const cssRulesByBucket = evaluationResult.value;
                                Object.values(cssRulesByBucket).forEach(cssBucketEntries => {
                                    const cssRules = cssBucketEntries.map(cssBucketEntry => {
                                        const [cssRule] = (0, core_2.normalizeCSSBucketEntry)(cssBucketEntry);
                                        return cssRule;
                                    });
                                    state.cssRules.push(...cssRules);
                                });
                            }
                            else if (functionKind === '__resetStyles') {
                                const cssRules = evaluationResult.value;
                                state.cssRules.push(...cssRules);
                            }
                            argumentPath.remove();
                        },
                    });
                },
            },
        },
    };
});
//# sourceMappingURL=babelPluginStripGriffelRuntime.js.map