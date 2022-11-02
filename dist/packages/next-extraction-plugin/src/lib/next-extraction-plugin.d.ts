import type { GriffelCSSExtractionPluginOptions } from '@griffel/webpack-extraction-plugin';
import type { NextConfig } from 'next';
import type { RuleSetRule } from 'webpack';
declare type GriffelNextExtractionPluginOptions = GriffelCSSExtractionPluginOptions & {
    extractLoaderRuleAttrs?: Omit<RuleSetRule, 'test' | 'use'>;
};
export declare const withGriffelCSSExtraction: ({ extractLoaderRuleAttrs: webpackLoaderRules, ...webpackPluginOptions }?: GriffelNextExtractionPluginOptions) => (nextConfig?: NextConfig) => NextConfig;
export {};
