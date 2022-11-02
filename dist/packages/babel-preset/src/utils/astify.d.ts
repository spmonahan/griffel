import { types as t } from '@babel/core';
/**
 * Transforms runtime literals into AST tree.
 */
export declare function astify<T>(literal: T): t.NullLiteral | t.NumericLiteral | t.StringLiteral | t.BooleanLiteral | t.UnaryExpression | t.ArrayExpression | t.ObjectExpression;
