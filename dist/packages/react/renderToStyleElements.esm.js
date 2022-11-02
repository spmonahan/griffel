import { styleBucketOrdering } from '@griffel/core';
import * as React from 'react';

/**
 * This method returns a list of <style> React elements with the rendered CSS. This is useful for Server-Side rendering.
 *
 * @public
 */

function renderToStyleElements(renderer) {
  const stylesheets = Object.values(renderer.stylesheets) // first sort: bucket names
  .sort((a, b) => {
    return styleBucketOrdering.indexOf(a.bucketName) - styleBucketOrdering.indexOf(b.bucketName);
  }) // second sort: media queries
  .sort((a, b) => {
    const mediaA = a.elementAttributes['media'];
    const mediaB = b.elementAttributes['media'];

    if (mediaA && mediaB) {
      return renderer.compareMediaQueries(mediaA, mediaB);
    }

    if (mediaA || mediaB) {
      return mediaA ? 1 : -1;
    }

    return 0;
  });
  return stylesheets.map(stylesheet => {
    const cssRules = stylesheet.cssRules(); // don't want to create any empty style elements

    if (!cssRules.length) {
      return null;
    }

    return /*#__PURE__*/React.createElement('style', Object.assign(Object.assign({
      key: stylesheet.bucketName
    }, stylesheet.elementAttributes), {
      'data-make-styles-rehydration': 'true',
      dangerouslySetInnerHTML: {
        __html: cssRules.join('')
      }
    }));
  }).filter(Boolean);
}

export { renderToStyleElements };
//# sourceMappingURL=renderToStyleElements.esm.js.map
