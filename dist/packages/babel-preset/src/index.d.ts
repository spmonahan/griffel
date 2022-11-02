import type { ConfigAPI } from '@babel/core';
import type { BabelPluginOptions } from './types';
export { default as shakerEvaluator } from '@linaria/shaker';
export { EvalCache, Module } from '@linaria/babel-preset';
export { configSchema } from './schema';
export type { Evaluator, EvalRule } from '@linaria/babel-preset';
export type { BabelPluginOptions };
export default function griffelPreset(babel: ConfigAPI, options: BabelPluginOptions): {
    plugins: (BabelPluginOptions | ((api: object, options: Partial<BabelPluginOptions> | null | undefined, dirname: string) => import("@babel/core").PluginObj<import("@babel/core").PluginPass & {
        importDeclarationPaths?: import("@babel/traverse").NodePath<import("@babel/types").ImportDeclaration>[] | undefined;
        requireDeclarationPath?: import("@babel/traverse").NodePath<import("@babel/types").VariableDeclarator> | undefined;
        definitionPaths?: {
            functionKind: "makeStyles" | "makeResetStyles";
            path: import("@babel/traverse").NodePath<import("@babel/types").SpreadElement | import("@babel/types").Expression>;
        }[] | undefined;
        calleePaths?: import("@babel/traverse").NodePath<import("@babel/types").Identifier>[] | undefined;
    }>))[][];
};
