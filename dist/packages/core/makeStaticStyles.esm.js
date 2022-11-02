import { resolveStaticStyleRules } from './runtime/resolveStaticStyleRules.esm.js';

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
      options.renderer.insertCSSRules(resolveStaticStyleRules(styleRules));
    }

    styleCache[cacheKey] = true;
  }

  return useStaticStyles;
}

export { makeStaticStyles };
//# sourceMappingURL=makeStaticStyles.esm.js.map
