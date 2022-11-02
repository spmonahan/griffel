import * as CSS from 'csstype';
export declare type GriffelStylesCSSValue = string | 0;
/**
 * Griffel doesn't support expansion of CSS shorthands.
 * They can be replaced either with the corresponding longhand properties or with the `shorthands` helper functions.
 * @see https://griffel.js.org/react/guides/limitations#css-shorthands-are-not-supported
 */
export interface GriffelStylesUnsupportedCSSProperties extends Record<keyof CSS.StandardShorthandProperties, never> {
    /** @deprecated */
    all: never;
    /** @deprecated Use corresponding longhand properties such as `animationName` and `animationDuration` instead. */
    animation: never;
    /** @deprecated Use corresponding longhand properties such as `backgroundImage` and `backgroundSize` instead. */
    background: never;
    /** @deprecated Use corresponding longhand properties `backgroundPositionX` and `backgroundPositionY` instead. */
    backgroundPosition: never;
    /** @deprecated Use `shorthands.border()` instead. */
    border: never;
    /** @deprecated Use corresponding longhand properties such as `borderBlockStartColor` and `borderBlockEndStyle` instead. */
    borderBlock: never;
    /** @deprecated Use corresponding longhand properties such as `borderBlockEndColor` and `borderBlockEndStyle` instead. */
    borderBlockEnd: never;
    /** @deprecated Use corresponding longhand properties such as `borderBlockStartColor` and `borderBlockStartStyle` instead. */
    borderBlockStart: never;
    /** @deprecated Use `shorthands.borderBottom()` instead. */
    borderBottom: never;
    /** @deprecated Use `shorthands.borderColor()` instead. */
    borderColor: never;
    /** @deprecated Use corresponding longhand properties such as `borderImageSource` and `borderImageWidth` instead. */
    borderImage: never;
    /** @deprecated Use corresponding longhand properties such as `borderInlineStartColor` and `borderInlineEndStyle` instead. */
    borderInline: never;
    /** @deprecated Use corresponding longhand properties such as `borderInlineEndColor` and `borderInlineEndStyle` instead. */
    borderInlineEnd: never;
    /** @deprecated Use corresponding longhand properties such as `borderInlineStartColor` and `borderInlineStartStyle` instead. */
    borderInlineStart: never;
    /** @deprecated Use `shorthands.borderLeft()` instead. */
    borderLeft: never;
    /** @deprecated Use `shorthands.borderRadius()` instead. */
    borderRadius: never;
    /** @deprecated Use `shorthands.borderRight()` instead. */
    borderRight: never;
    /** @deprecated Use `shorthands.borderStyle()` instead. */
    borderStyle: never;
    /** @deprecated Use `shorthands.borderTop()` instead. */
    borderTop: never;
    /** @deprecated Use `shorthands.borderWidth()` instead. */
    borderWidth: never;
    /** @deprecated Use corresponding longhand properties `columnCount` and `columnWidth` instead. */
    columns: never;
    /** @deprecated Use corresponding longhand properties such as `columnRuleWidth` and `columnRuleColor` instead. */
    columnRule: never;
    /** @deprecated Use `shorthands.flex()` instead. */
    flex: never;
    /** @deprecated Use corresponding longhand properties `flexWrap` and `flexDirection` instead. */
    flexFlow: never;
    /** @deprecated Use corresponding longhand properties such as `fontFamily` and `fontSize` instead. */
    font: never;
    /** @deprecated Use `shorthands.gap()` instead. */
    gap: never;
    /** @deprecated Use corresponding longhand properties such as `gridTemplateColumns` and `gridAutoRows` instead. */
    grid: never;
    /** @deprecated Use `shorthands.gridArea()` instead. */
    gridArea: never;
    /** @deprecated Use corresponding longhand properties `gridColumnStart` and `gridColumnEnd` instead. */
    gridColumn: never;
    /** @deprecated Use corresponding longhand properties `gridRowStart` and `gridRowEnd` instead. */
    gridRow: never;
    /** @deprecated Use corresponding longhand properties such as `gridTemplateColumns` and `gridTemplateRows` instead. */
    gridTemplate: never;
    /** @deprecated */
    lineClamp: never;
    /** @deprecated Use corresponding longhand properties such as `listStyleType` instead. */
    listStyle: never;
    /** @deprecated Use `shorthands.margin()` instead. */
    margin: never;
    /** @deprecated Use corresponding longhand properties such as `maskImage` and `maskSize` instead. */
    mask: never;
    /** @deprecated Use corresponding longhand properties such as `maskBorderSource` and `maskBorderWidth` instead. */
    maskBorder: never;
    /** @deprecated */
    motion: never;
    /** @deprecated Use corresponding longhand properties such as `offsetPath` and `offsetDistance` instead. */
    offset: never;
    /** @deprecated Use corresponding longhand properties such as `outlineColor` and `outlineWidth` instead. */
    outline: never;
    /** @deprecated Use `shorthands.overflow()` instead. */
    overflow: never;
    /** @deprecated Use corresponding longhand properties `overscrollBehaviorX` and `overscrollBehaviorY` instead. */
    overscrollBehavior: never;
    /** @deprecated Use `shorthands.padding()` instead. */
    padding: never;
    /** @deprecated Use corresponding longhand properties `alignItems` and `justifyItems` instead. */
    placeItems: never;
    /** @deprecated Use corresponding longhand properties `alignSelf` and `justifySelf` instead. */
    placeSelf: never;
    /** @deprecated Use corresponding longhand properties such as `textDecorationColor` and `textDecorationLine` instead. */
    textDecoration: never;
    /** @deprecated Use corresponding longhand properties `textEmphasisColor` and `textEmphasisStyle` instead. */
    textEmphasis: never;
    /** @deprecated Use `shorthands.transition()` instead. */
    transition: never;
}
export declare type ValueOrArray<T> = T | Array<T>;
declare type GriffelStylesCSSProperties = Omit<CSS.PropertiesFallback<GriffelStylesCSSValue>, 'animationName'> & Partial<GriffelStylesUnsupportedCSSProperties>;
export declare type GriffelStylesStrictCSSObject = GriffelStylesCSSProperties & GriffelStylesCSSPseudos & {
    animationName?: GriffelAnimation | GriffelAnimation[] | CSS.Property.Animation;
};
declare type GriffelStylesCSSPseudos = {
    [Property in CSS.Pseudos]?: (GriffelStylesStrictCSSObject & {
        content?: string | string[];
    }) | (GriffelStylesCSSObjectCustomL1 & {
        content?: string | string[];
    });
};
declare type GriffelStylesCSSObjectCustomL1 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelStylesCSSObjectCustomL2;
} & GriffelStylesStrictCSSObject;
declare type GriffelStylesCSSObjectCustomL2 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelStylesCSSObjectCustomL3;
} & GriffelStylesStrictCSSObject;
declare type GriffelStylesCSSObjectCustomL3 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelStylesCSSObjectCustomL4;
} & GriffelStylesStrictCSSObject;
declare type GriffelStylesCSSObjectCustomL4 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelStylesCSSObjectCustomL5;
} & GriffelStylesStrictCSSObject;
declare type GriffelStylesCSSObjectCustomL5 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelStylesStrictCSSObject;
} & GriffelStylesStrictCSSObject;
export declare type GriffelStyle = GriffelStylesStrictCSSObject | GriffelStylesCSSObjectCustomL1;
export declare type GriffelAnimation = Record<'from' | 'to' | string, GriffelStylesCSSObjectCustomL1>;
export declare type GriffelStaticStyle = {
    [key: string]: CSS.Properties & Record<string, any>;
} & {
    '@font-face'?: {
        fontFamily: string;
        src: string;
        fontFeatureSettings?: string;
        fontStretch?: string;
        fontStyle?: string;
        fontVariant?: string;
        fontVariationSettings?: string;
        fontWeight?: number | string;
        unicodeRange?: string;
    };
};
export declare type GriffelStaticStyles = GriffelStaticStyle | string;
declare type GriffelResetStylesCSSProperties = Omit<CSS.PropertiesFallback<ValueOrArray<GriffelStylesCSSValue>>, 'animationName'>;
declare type GriffelResetStylesStrictCSSObject = GriffelResetStylesCSSProperties & GriffelResetStylesCSSPseudos & {
    animationName?: GriffelAnimation | GriffelAnimation[] | CSS.Property.Animation;
};
declare type GriffelResetStylesCSSPseudos = {
    [Property in CSS.Pseudos]?: (GriffelResetStylesStrictCSSObject & {
        content?: string | string[];
    }) | (GriffelResetStylesCSSObjectCustomL1 & {
        content?: string | string[];
    });
};
declare type GriffelResetStylesCSSObjectCustomL1 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelResetStylesCSSObjectCustomL2;
} & GriffelResetStylesStrictCSSObject;
declare type GriffelResetStylesCSSObjectCustomL2 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelResetStylesCSSObjectCustomL3;
} & GriffelResetStylesStrictCSSObject;
declare type GriffelResetStylesCSSObjectCustomL3 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelResetStylesCSSObjectCustomL4;
} & GriffelResetStylesStrictCSSObject;
declare type GriffelResetStylesCSSObjectCustomL4 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelResetStylesCSSObjectCustomL5;
} & GriffelResetStylesStrictCSSObject;
declare type GriffelResetStylesCSSObjectCustomL5 = {
    [Property: string]: string | number | (string | number)[] | undefined | GriffelResetStylesStrictCSSObject;
} & GriffelResetStylesStrictCSSObject;
export declare type GriffelResetStyle = GriffelResetStylesStrictCSSObject | GriffelResetStylesCSSObjectCustomL1;
export interface MakeStylesOptions {
    dir: 'ltr' | 'rtl';
    renderer: GriffelRenderer;
}
export interface MakeStaticStylesOptions {
    renderer: GriffelRenderer;
}
export interface IsomorphicStyleSheet {
    /**
     * Attributes applied to the underlying HTMLStyleElement
     */
    elementAttributes: Record<string, string>;
    /**
     * Underlying HTMLStyleElement
     */
    element: HTMLStyleElement | undefined;
    bucketName: StyleBucketName;
    /**
     * Returns all CSS rules on the stylesheet
     */
    cssRules(): string[];
    insertRule(rule: string): number | undefined;
}
export interface GriffelRenderer {
    id: string;
    /**
     * @private
     */
    insertionCache: Record<string, StyleBucketName>;
    /**
     * @private
     */
    stylesheets: {
        [key in StyleBucketName]?: IsomorphicStyleSheet;
    } & Record<string, IsomorphicStyleSheet>;
    /**
     * @private
     */
    insertCSSRules(cssRules: CSSRulesByBucket): void;
    /**
     * @private
     */
    compareMediaQueries(a: string, b: string): number;
}
/**
 * Buckets under which we will group our stylesheets.
 */
export declare type StyleBucketName = keyof CSSRulesByBucket;
export declare type SequenceHash = string;
export declare type PropertyHash = string;
export declare type CSSClasses = /* ltrClassName */ string | [/* ltrClassName */ string, /* rtlClassName */ string];
export declare type CSSClassesMap = Record<PropertyHash, CSSClasses>;
export declare type CSSClassesMapBySlot<Slots extends string | number> = Record<Slots, CSSClassesMap>;
export declare type CSSRulesByBucket = {
    r?: CSSBucketEntry[];
    d?: CSSBucketEntry[];
    l?: CSSBucketEntry[];
    v?: CSSBucketEntry[];
    w?: CSSBucketEntry[];
    f?: CSSBucketEntry[];
    i?: CSSBucketEntry[];
    h?: CSSBucketEntry[];
    a?: CSSBucketEntry[];
    k?: CSSBucketEntry[];
    t?: CSSBucketEntry[];
    m?: CSSBucketEntry[];
};
export declare type CSSBucketEntry = string | [string, Record<string, unknown>];
export declare type StylesBySlots<Slots extends string | number> = Record<Slots, GriffelStyle>;
export declare type LookupItem = [/* definitions */ CSSClassesMap, /* dir */ /* dir */ 'rtl' | 'ltr'];
export {};
