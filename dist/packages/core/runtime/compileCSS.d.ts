export interface CompileCSSOptions {
    className: string;
    selectors: string[];
    media: string;
    layer: string;
    support: string;
    property: string;
    value: number | string | Array<number | string>;
    rtlClassName?: string;
    rtlProperty?: string;
    rtlValue?: number | string | Array<number | string>;
}
/**
 * Normalizes pseudo selectors to always contain &, requires to work properly with comma-separated selectors.
 *
 * @example
 *   ":hover" => "&:hover"
 *   " :hover" => "& :hover"
 *   ":hover,:focus" => "&:hover,&:focus"
 *   " :hover, :focus" => "& :hover,& :focus"
 */
export declare function normalizePseudoSelector(pseudoSelector: string): string;
export declare function compileCSSRules(cssRules: string): string[];
export declare function compileCSS(options: CompileCSSOptions): [string, string?];
