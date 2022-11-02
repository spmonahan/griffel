import { GriffelRenderer } from '../types';
export interface CreateDOMRendererOptions {
    /**
     * A map of attributes that's passed to the generated style elements. Is useful to set "nonce" attribute.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce
     */
    styleElementAttributes?: Record<string, string>;
    /**
     * A filter run before CSS rule insertion to systematically remove CSS rules at render time.
     * This can be used to forbid specific rules from being written to the style sheet at run time without
     * affecting build time styles.
     *
     * ⚠️ Keep the filter as performant as possible to avoid negative performance impacts to your application.
     * ⚠️ This API is unstable and can be removed from the library at any time.
     */
    unstable_filterCSSRule?: (cssRule: string) => boolean;
    /**
     * @param a - media query
     * @param b - media query
     * @returns positive number if a > b or negative number if a < b
     */
    compareMediaQueries?: (a: string, b: string) => number;
    constructableStylesheets?: boolean;
}
/** @internal */
export declare const defaultCompareMediaQueries: (a: string, b: string) => 0 | 1 | -1;
/**
 * Creates a new instances of a renderer.
 *
 * @public
 */
export declare function createDOMRenderer(target?: Document | undefined, options?: CreateDOMRendererOptions): GriffelRenderer;
