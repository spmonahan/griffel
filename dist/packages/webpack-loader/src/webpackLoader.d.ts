import { BabelPluginOptions } from '@griffel/babel-preset';
import * as webpack from 'webpack';
export declare type WebpackLoaderOptions = BabelPluginOptions;
declare type WebpackLoaderParams = Parameters<webpack.LoaderDefinitionFunction<WebpackLoaderOptions>>;
export declare function shouldTransformSourceCode(sourceCode: string, modules: WebpackLoaderOptions['modules'] | undefined): boolean;
export declare function webpackLoader(this: webpack.LoaderContext<never>, sourceCode: WebpackLoaderParams[0], inputSourceMap: WebpackLoaderParams[1]): void;
export {};
