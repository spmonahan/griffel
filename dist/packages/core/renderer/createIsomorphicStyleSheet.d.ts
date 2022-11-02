import { IsomorphicStyleSheet, StyleBucketName } from '../types';
export declare function createIsomorphicStyleSheet(styleElement: HTMLStyleElement | undefined, bucketName: StyleBucketName, elementAttributes: Record<string, string>, constructableStylesheets: boolean): IsomorphicStyleSheet;
export declare function createIsomorphicStyleSheetFromElement(element: HTMLStyleElement): IsomorphicStyleSheet;
