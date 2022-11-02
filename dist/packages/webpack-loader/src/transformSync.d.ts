import * as Babel from '@babel/core';
import { BabelPluginOptions } from '@griffel/babel-preset';
export declare type TransformOptions = {
    filename: string;
    inputSourceMap: Babel.TransformOptions['inputSourceMap'];
    enableSourceMaps: boolean;
    pluginOptions: BabelPluginOptions;
};
export declare type TransformResult = {
    code: string;
    sourceMap: NonNullable<Babel.BabelFileResult['map']> | undefined;
};
/**
 * Transforms passed source code with Babel, uses user's config for parsing, but ignores it for transforms.
 */
export declare function transformSync(sourceCode: string, options: TransformOptions): TransformResult;
