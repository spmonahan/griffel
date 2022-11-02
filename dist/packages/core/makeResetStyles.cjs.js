'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resolveResetStyleRules = require('./runtime/resolveResetStyleRules.cjs.js');

/**
 * @internal
 */

function makeResetStyles(styles) {
  const insertionCache = {};
  let ltrClassName = null;
  let rtlClassName = null;
  let cssRules = null;

  function computeClassName(options) {
    const {
      dir,
      renderer
    } = options;

    if (ltrClassName === null) {
      [ltrClassName, rtlClassName, cssRules] = resolveResetStyleRules.resolveResetStyleRules(styles);
    }

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

exports.makeResetStyles = makeResetStyles;
//# sourceMappingURL=makeResetStyles.cjs.js.map
