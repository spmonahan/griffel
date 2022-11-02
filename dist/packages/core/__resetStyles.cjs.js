'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @internal
 */
function __resetStyles(ltrClassName, rtlClassName, cssRules) {
  const insertionCache = {};

  function computeClassName(options) {
    const {
      dir,
      renderer
    } = options;
    const isLTR = dir === 'ltr'; // As RTL classes are different they should have a different cache key for insertion

    const rendererId = isLTR ? renderer.id : renderer.id + 'r';

    if (insertionCache[rendererId] === undefined) {
      renderer.insertCSSRules({
        r: cssRules
      });
      insertionCache[rendererId] = true;
    }

    return isLTR ? ltrClassName : rtlClassName || ltrClassName;
  }

  return computeClassName;
}

exports.__resetStyles = __resetStyles;
//# sourceMappingURL=__resetStyles.cjs.js.map
