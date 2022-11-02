import { DATA_BUCKET_ATTR } from '../constants.esm.js';
import { createIsomorphicStyleSheet } from './createIsomorphicStyleSheet.esm.js';

/**
 * Ordered style buckets using their short pseudo name.
 *
 * @internal
 */

const styleBucketOrdering = [// reset styles
'r', // catch-all
'd', // link
'l', // visited
'v', // focus-within
'w', // focus
'f', // focus-visible
'i', // hover
'h', // active
'a', // keyframes
'k', // at-rules
't', // @media rules
'm']; // avoid repeatedly calling `indexOf`to determine order during new insertions

const styleBucketOrderingMap = /*#__PURE__*/styleBucketOrdering.reduce((acc, cur, j) => {
  acc[cur] = j;
  return acc;
}, {});
/**
 * Lazily adds a `<style>` bucket to the `<head>`. This will ensure that the style buckets are ordered.
 */

function getStyleSheetForBucket(bucketName, target, renderer, elementAttributes = {}, metadata, constructableStylesheets) {
  let stylesheetKey = bucketName;

  if (bucketName === 'm' && metadata) {
    stylesheetKey = bucketName + metadata['m'];
  }

  if (!renderer.stylesheets[stylesheetKey]) {
    const tag = target && target.createElement('style');

    if (bucketName === 'm' && metadata) {
      elementAttributes['media'] = metadata['m'];
    }

    const stylesheet = createIsomorphicStyleSheet(tag, bucketName, elementAttributes, !!constructableStylesheets);
    renderer.stylesheets[stylesheetKey] = stylesheet;

    if (target && tag) {
      const elementSibling = findElementSibling(target, bucketName, renderer, metadata);
      target.head.insertBefore(tag, elementSibling);
    }
  }

  return renderer.stylesheets[stylesheetKey];
}
/**
 * Finds an element before which the new bucket style element should be inserted following the
 * bucket sort order
 *
 * @param target - document
 * @param targetBucket - The bucket that should be inserted to DOM
 * @param renderer - Griffel renderer
 * @param metadata - metadata for CSS rule
 * @returns - Smallest style element with greater sort order than the current bucket
 */

function findElementSibling(target, targetBucket, renderer, metadata) {
  const targetOrder = styleBucketOrderingMap[targetBucket]; // Similar to javascript sort comparators where
  // a positive value is increasing sort order
  // a negative value is decreasing sort order

  let comparer = el => targetOrder - styleBucketOrderingMap[el.getAttribute(DATA_BUCKET_ATTR)];

  let styleElements = target.head.querySelectorAll(`[${DATA_BUCKET_ATTR}]`);

  if (targetBucket === 'm' && metadata) {
    const mediaElements = target.head.querySelectorAll(`[${DATA_BUCKET_ATTR}="${targetBucket}"]`); // only reduce the scope of the search and change comparer
    // if there are other media buckets already on the page

    if (mediaElements.length) {
      styleElements = mediaElements;

      comparer = el => renderer.compareMediaQueries(metadata['m'], el.media);
    }
  }

  for (const styleElement of styleElements) {
    if (comparer(styleElement) < 0) {
      return styleElement;
    }
  }

  return null;
}

export { getStyleSheetForBucket, styleBucketOrdering };
//# sourceMappingURL=getStyleSheetForBucket.esm.js.map
