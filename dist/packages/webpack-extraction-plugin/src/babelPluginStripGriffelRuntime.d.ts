import { PluginObj, PluginPass } from '@babel/core';
declare type StripRuntimeBabelPluginOptions = {
    /** A directory that contains fake .css file used for CSS extraction */
    resourceDirectory?: string;
};
declare type StripRuntimeBabelPluginState = PluginPass & {
    cssRules?: string[];
};
export declare type StripRuntimeBabelPluginMetadata = {
    cssRules: string[];
};
export declare function transformUrl(filename: string, resourceDirectory: string, assetPath: string): string;
export declare const babelPluginStripGriffelRuntime: (api: object, options: Partial<StripRuntimeBabelPluginOptions> | null | undefined, dirname: string) => PluginObj<StripRuntimeBabelPluginState>;
export {};
