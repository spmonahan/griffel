/**
 * A version of makeResetStyles() that accepts build output as an input and skips all runtime transforms & DOM insertion.
 *
 * @internal
 */
export declare function __resetStyles(ltrClassName: string, rtlClassName: string | null): () => string;
