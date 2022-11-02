"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.astify = void 0;
const core_1 = require("@babel/core");
/**
 * Transforms runtime literals into AST tree.
 */
function astify(literal) {
    if (literal === null) {
        return core_1.types.nullLiteral();
    }
    switch (typeof literal) {
        case 'function':
            throw new Error('We intentionally do not support serialization of functions, this branch should be never executed');
        case 'number':
            return core_1.types.numericLiteral(literal);
        case 'string':
            return core_1.types.stringLiteral(literal);
        case 'boolean':
            return core_1.types.booleanLiteral(literal);
        case 'undefined':
            return core_1.types.unaryExpression('void', core_1.types.numericLiteral(0), true);
        default:
            if (Array.isArray(literal)) {
                return core_1.types.arrayExpression(literal.map(astify));
            }
            return core_1.types.objectExpression(Object.keys(literal)
                .filter(k => typeof literal[k] !== 'undefined')
                .map(k => core_1.types.objectProperty(core_1.types.stringLiteral(k), astify(literal[k]))));
    }
}
exports.astify = astify;
//# sourceMappingURL=astify.js.map