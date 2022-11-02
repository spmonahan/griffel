import { NodePath, PluginObj, PluginPass, types as t } from '@babel/core';
import { BabelPluginOptions } from './types';
declare type FunctionKinds = 'makeStyles' | 'makeResetStyles';
declare type BabelPluginState = PluginPass & {
    importDeclarationPaths?: NodePath<t.ImportDeclaration>[];
    requireDeclarationPath?: NodePath<t.VariableDeclarator>;
    definitionPaths?: {
        functionKind: FunctionKinds;
        path: NodePath<t.Expression | t.SpreadElement>;
    }[];
    calleePaths?: NodePath<t.Identifier>[];
};
export declare const transformPlugin: (api: object, options: Partial<BabelPluginOptions> | null | undefined, dirname: string) => PluginObj<BabelPluginState>;
export {};
