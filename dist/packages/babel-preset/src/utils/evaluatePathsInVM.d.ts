import { NodePath, types as t } from '@babel/core';
import * as template from '@babel/template';
import type { BabelPluginOptions } from '../types';
export declare const expressionTpl: (arg?: template.PublicReplacements | undefined) => t.Expression;
/**
 * Evaluates passed paths in Node environment to resolve all lazy values.
 */
export declare function evaluatePathsInVM(program: NodePath<t.Program>, filename: string, nodePaths: NodePath<t.Expression | t.SpreadElement>[], pluginOptions: Required<BabelPluginOptions>): void;
