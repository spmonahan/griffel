'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var injectDevTools = require('../devtools/injectDevTools.cjs.js');
var isDevToolsEnabled = require('../devtools/isDevToolsEnabled.cjs.js');
var store = require('../devtools/store.cjs.js');
var normalizeCSSBucketEntry = require('../runtime/utils/normalizeCSSBucketEntry.cjs.js');
var getStyleSheetForBucket = require('./getStyleSheetForBucket.cjs.js');

let lastIndex = 0;
/** @internal */

const defaultCompareMediaQueries = (a, b) => a < b ? -1 : a > b ? 1 : 0;
/**
 * Creates a new instances of a renderer.
 *
 * @public
 */

function createDOMRenderer(target = typeof document === 'undefined' ? undefined : document, options = {}) {
  const {
    unstable_filterCSSRule,
    compareMediaQueries = defaultCompareMediaQueries,
    constructableStylesheets = true
  } = options;
  const renderer = {
    insertionCache: {},
    stylesheets: {},
    compareMediaQueries,
    id: `d${lastIndex++}`,

    insertCSSRules(cssRules) {
      // eslint-disable-next-line guard-for-in
      for (const styleBucketName in cssRules) {
        const cssRulesForBucket = cssRules[styleBucketName]; // This is a hot path in rendering styles: ".length" is cached in "l" var to avoid accesses the property

        for (let i = 0, l = cssRulesForBucket.length; i < l; i++) {
          const [ruleCSS, metadata] = normalizeCSSBucketEntry.normalizeCSSBucketEntry(cssRulesForBucket[i]);
          const sheet = getStyleSheetForBucket.getStyleSheetForBucket(styleBucketName, target, renderer, options.styleElementAttributes, metadata, constructableStylesheets);

          if (renderer.insertionCache[ruleCSS]) {
            continue;
          }

          renderer.insertionCache[ruleCSS] = styleBucketName;

          if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled.isDevToolsEnabled) {
            store.debugData.addCSSRule(ruleCSS);
          }

          try {
            if (unstable_filterCSSRule) {
              if (unstable_filterCSSRule(ruleCSS)) {
                sheet.insertRule(ruleCSS);
              }
            } else {
              sheet.insertRule(ruleCSS);
            }
          } catch (e) {
            // We've disabled these warnings due to false-positive errors with browser prefixes
            if (process.env.NODE_ENV !== 'production' && !ignoreSuffixesRegex.test(ruleCSS)) {
              // eslint-disable-next-line no-console
              console.error(`There was a problem inserting the following rule: "${ruleCSS}"`, e);
            }
          }
        }
      }
    }

  };

  if (target && process.env.NODE_ENV !== 'production' && isDevToolsEnabled.isDevToolsEnabled) {
    injectDevTools.injectDevTools(target);
  }

  return renderer;
}
/**
 * Suffixes to be ignored in case of error
 */

const ignoreSuffixes = /*#__PURE__*/['-moz-placeholder', '-moz-focus-inner', '-moz-focusring', '-ms-input-placeholder', '-moz-read-write', '-moz-read-only'].join('|');
const ignoreSuffixesRegex = /*#__PURE__*/new RegExp(`:(${ignoreSuffixes})`);

exports.createDOMRenderer = createDOMRenderer;
exports.defaultCompareMediaQueries = defaultCompareMediaQueries;
//# sourceMappingURL=createDOMRenderer.cjs.js.map
