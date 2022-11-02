import { NodePath, types as t } from '@babel/core';
import type { BabelPluginOptions } from '../types';
/**
 * Checks if passed paths can be evaluated by Babel, if no - fallbacks to Node evaluation.
 * The goal there is to ensure that all paths are pure and can be safely evaluated later by Babel.
 */
export declare function evaluatePaths(program: NodePath<t.Program>, filename: string, paths: NodePath<t.Expression | t.SpreadElement>[], pluginOptions: Required<BabelPluginOptions>): void;
