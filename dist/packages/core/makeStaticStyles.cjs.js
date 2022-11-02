'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var resolveStaticStyleRules = require('./runtime/resolveStaticStyleRules.cjs.js');

/**
 * Register static css.
 * @param styles - styles object or string.
 */

function makeStaticStyles(styles) {
  const styleCache = {};
  const stylesSet = Array.isArray(styles) ? styles : [styles];

  function useStaticStyles(options) {
    const cacheKey = options.renderer.id;

    if (styleCache[cacheKey]) {
      return;
    }

    for (const styleRules of stylesSet) {
      options.renderer.insertCSSRules(resolveStaticStyleRules.resolveStaticStyleRules(styleRules));
    }

    styleCache[cacheKey] = true;
  }

  return useStaticStyles;
}

exports.makeStaticStyles = makeStaticStyles;
//# sourceMappingURL=makeStaticStyles.cjs.js.map
