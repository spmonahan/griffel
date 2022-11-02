'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@griffel/core');
var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/**
 * This method returns a list of <style> React elements with the rendered CSS. This is useful for Server-Side rendering.
 *
 * @public
 */

function renderToStyleElements(renderer) {
  const stylesheets = Object.values(renderer.stylesheets) // first sort: bucket names
  .sort((a, b) => {
    return core.styleBucketOrdering.indexOf(a.bucketName) - core.styleBucketOrdering.indexOf(b.bucketName);
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

    return /*#__PURE__*/React__namespace.createElement('style', Object.assign(Object.assign({
      key: stylesheet.bucketName
    }, stylesheet.elementAttributes), {
      'data-make-styles-rehydration': 'true',
      dangerouslySetInnerHTML: {
        __html: cssRules.join('')
      }
    }));
  }).filter(Boolean);
}

exports.renderToStyleElements = renderToStyleElements;
//# sourceMappingURL=renderToStyleElements.cjs.js.map
