import { GriffelStylesUnsupportedCSSProperties, LookupItem, SequenceHash } from './types';
/** @internal */
export declare const DATA_BUCKET_ATTR = "data-make-styles-bucket";
/** @internal */
export declare const HASH_PREFIX = "f";
/** @internal */
export declare const RESET_HASH_PREFIX = "r";
/** @internal */
export declare const SEQUENCE_HASH_LENGTH = 7;
/** @internal */
export declare const SEQUENCE_PREFIX = "___";
/** @internal */
export declare const DEBUG_SEQUENCE_SEPARATOR = "_";
/** @internal */
export declare const SEQUENCE_SIZE: number;
/** @internal */
export declare const DEFINITION_LOOKUP_TABLE: Record<SequenceHash, LookupItem>;
/** @internal */
export declare const LOOKUP_DEFINITIONS_INDEX = 0;
/** @internal */
export declare const LOOKUP_DIR_INDEX = 1;
/** @internal */
export declare const UNSUPPORTED_CSS_PROPERTIES: Record<keyof GriffelStylesUnsupportedCSSProperties, 1>;
