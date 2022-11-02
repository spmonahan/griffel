import { GriffelRenderer, IsomorphicStyleSheet, StyleBucketName } from '../types';
/**
 * Ordered style buckets using their short pseudo name.
 *
 * @internal
 */
export declare const styleBucketOrdering: StyleBucketName[];
/**
 * Lazily adds a `<style>` bucket to the `<head>`. This will ensure that the style buckets are ordered.
 */
export declare function getStyleSheetForBucket(bucketName: StyleBucketName, target: Document | undefined, renderer: GriffelRenderer, elementAttributes?: Record<string, string>, metadata?: Record<string, unknown>, constructableStylesheets?: boolean): IsomorphicStyleSheet;
