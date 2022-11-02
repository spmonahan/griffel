"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluatePaths = void 0;
const evaluatePathsInVM_1 = require("./evaluatePathsInVM");
/**
 * Checks if passed paths can be evaluated by Babel, if no - fallbacks to Node evaluation.
 * The goal there is to ensure that all paths are pure and can be safely evaluated later by Babel.
 */
function evaluatePaths(program, filename, paths, pluginOptions) {
    const pathsToBeEvaluatedInVM = [];
    for (let i = 0; i < paths.length; i++) {
        const result = paths[i].evaluate();
        // Optimistic case, we were able to resolve a path without evaluation in Node environment 🎉
        if (result.confident) {
            // Heads up!
            // We don't need to do any replacements there as after resolving all style objects will be evaluated again
            continue;
        }
        pathsToBeEvaluatedInVM.push(paths[i]);
    }
    if (pathsToBeEvaluatedInVM.length > 0) {
        (0, evaluatePathsInVM_1.evaluatePathsInVM)(program, filename, pathsToBeEvaluatedInVM, pluginOptions);
    }
}
exports.evaluatePaths = evaluatePaths;
//# sourceMappingURL=evaluatePaths.js.map