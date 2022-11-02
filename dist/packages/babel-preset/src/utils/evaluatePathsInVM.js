"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluatePathsInVM = exports.expressionTpl = void 0;
const core_1 = require("@babel/core");
const template = require("@babel/template");
const generator_1 = require("@babel/generator");
const babel_preset_1 = require("@linaria/babel-preset");
const astify_1 = require("./astify");
const EVAL_EXPORT_NAME = '__mkPreval';
function evaluate(code, filename, pluginOptions) {
    const options = {
        displayName: false,
        evaluate: true,
        rules: pluginOptions.evaluationRules,
        babelOptions: Object.assign(Object.assign({}, pluginOptions.babelOptions), { 
            // This instance of Babel should ignore all user's configs and apply only our transformPlugin
            configFile: false, babelrc: false }),
    };
    const mod = new babel_preset_1.Module(filename, options);
    mod.evaluate(code, [EVAL_EXPORT_NAME]);
    return mod.exports[EVAL_EXPORT_NAME];
}
function findFreeName(scope, name) {
    // By default `name` is used as a name of the function …
    let nextName = name;
    let idx = 0;
    while (scope.hasBinding(nextName, false)) {
        // … but if there is an already defined variable with this name …
        // … we are trying to use a name like wrap_N
        idx += 1;
        nextName = `wrap_${idx}`;
    }
    return nextName;
}
const expressionWrapperTpl = template.statement(`
  const %%wrapName%% = (fn) => {
    try {
      return fn();
    } catch (e) {
      return e;
    }
  };
`);
exports.expressionTpl = template.expression(`%%wrapName%%(() => %%expression%%)`);
const exportsPrevalTpl = template.statement(`exports.${EVAL_EXPORT_NAME} = %%expressions%%`);
/**
 * Creates a new program that includes required imports and wrappers to return resolved values.
 */
function addPreval(path, lazyDeps) {
    // Constant for "__mkPreval" with all dependencies
    const wrapName = findFreeName(path.scope, '_wrap');
    const programNode = path.node;
    return core_1.types.program([
        ...programNode.body,
        expressionWrapperTpl({ wrapName }),
        exportsPrevalTpl({
            expressions: core_1.types.arrayExpression(lazyDeps.map(expression => (0, exports.expressionTpl)({ expression, wrapName }))),
        }),
    ], programNode.directives, programNode.sourceType, programNode.interpreter);
}
/**
 * Evaluates passed paths in Node environment to resolve all lazy values.
 */
function evaluatePathsInVM(program, filename, nodePaths, pluginOptions) {
    const pathsToEvaluate = nodePaths.map(nodePath => {
        // spreads ("...fooBar") can't be executed directly, so they are wrapped with an object ("{...fooBar}")
        if (nodePath.isSpreadElement()) {
            return core_1.types.objectExpression([nodePath.node]);
        }
        return nodePath.node;
    });
    // Linaria also performs hoisting of identifiers, we don't need this as all makeStyles() calls should be top level
    const modifiedProgram = addPreval(program, pathsToEvaluate);
    const { code } = (0, generator_1.default)(modifiedProgram);
    const results = evaluate(code, filename, pluginOptions);
    for (let i = 0; i < nodePaths.length; i++) {
        const nodePath = nodePaths[i];
        nodePath.replaceWith((0, astify_1.astify)(results[i]));
    }
}
exports.evaluatePathsInVM = evaluatePathsInVM;
//# sourceMappingURL=evaluatePathsInVM.js.map