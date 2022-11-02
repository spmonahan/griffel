import { GriffelStyle } from '@griffel/core';
/**
 * Linaria v3 emits relative paths for assets, we normalize these paths to be relative from the project root to be the
 * same if an assets was used in different files.
 */
export declare function normalizeAssetPath(path: typeof import('path'), projectRoot: string, filename: string, asset: string): string;
export declare function normalizeStyleRule(path: typeof import('path'), projectRoot: string, filename: string, ruleValue: string | number): string | number;
export declare function normalizeStyleRules(path: typeof import('path'), projectRoot: string, filename: string, stylesBySlots: Record<string, GriffelStyle> | GriffelStyle): Record<string, GriffelStyle>;
