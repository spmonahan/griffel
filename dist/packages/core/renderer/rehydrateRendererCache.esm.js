import { createIsomorphicStyleSheetFromElement } from './createIsomorphicStyleSheet.esm.js';
import '../constants.esm.js';
import { debugData } from '../devtools/store.esm.js';
import { isDevToolsEnabled } from '../devtools/isDevToolsEnabled.esm.js';

// https://github.com/styletron/styletron/blob/e0fcae826744eb00ce679ac613a1b10d44256660/packages/styletron-engine-atomic/src/client/client.js#L8

const KEYFRAMES_HYDRATOR = /@(-webkit-)?keyframes ([^{]+){((?:(?:from|to|(?:\d+\.?\d*%))\{(?:[^}])*})*)}/g;
const AT_RULES_HYDRATOR = /@(media|supports|layer)[^{]+\{([\s\S]+?})\s*}/g;
const STYLES_HYDRATOR = /\.([^{:]+)(:[^{]+)?{(?:[^}]*;)?([^}]*?)}/g;
const regexps = {
  k: KEYFRAMES_HYDRATOR,
  t: AT_RULES_HYDRATOR,
  m: AT_RULES_HYDRATOR
};
/**
 * Should be called in a case of Server-Side rendering. Rehydrates cache from for a renderer to avoid double insertion
 * of classes to DOM.
 *
 * @public
 */

function rehydrateRendererCache(renderer, target = typeof document === 'undefined' ? undefined : document) {
  if (target) {
    const styleElements = target.querySelectorAll('[data-make-styles-bucket]');
    styleElements.forEach(styleElement => {
      const bucketName = styleElement.dataset['makeStylesBucket'];
      const regex = regexps[bucketName] || STYLES_HYDRATOR;
      const stylesheetKey = bucketName === 'm' ? bucketName + styleElement.media : bucketName; // 👇 If some elements are not created yet, we will register them in renderer

      if (!renderer.stylesheets[stylesheetKey]) {
        renderer.stylesheets[stylesheetKey] = createIsomorphicStyleSheetFromElement(styleElement);
      }

      let match;

      while (match = regex.exec(styleElement.textContent)) {
        // "cacheKey" is either a class name or an animation name
        const [cssRule] = match;
        renderer.insertionCache[cssRule] = bucketName;

        if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled) {
          debugData.addCSSRule(cssRule);
        }
      }
    });
  }
}

export { rehydrateRendererCache };
//# sourceMappingURL=rehydrateRendererCache.esm.js.map
