'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashString = require('@emotion/hash');
var core = require('rtl-css-js/core');
var constants = require('../constants.cjs.js');
var isMediaQuerySelector = require('./utils/isMediaQuerySelector.cjs.js');
var isLayerSelector = require('./utils/isLayerSelector.cjs.js');
var isNestedSelector = require('./utils/isNestedSelector.cjs.js');
var isSupportQuerySelector = require('./utils/isSupportQuerySelector.cjs.js');
var isObject = require('./utils/isObject.cjs.js');
var hyphenateProperty = require('./utils/hyphenateProperty.cjs.js');
var compileCSS = require('./compileCSS.cjs.js');
var compileKeyframeCSS = require('./compileKeyframeCSS.cjs.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hashString__default = /*#__PURE__*/_interopDefaultLegacy(hashString);

/**
 * @internal
 */

function createStringFromStyles(styles) {
  let ltrCSS = '';
  let rtlCSS = ''; // eslint-disable-next-line guard-for-in

  for (const property in styles) {
    const value = styles[property]; // eslint-disable-next-line eqeqeq

    if (value == null) {
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      const {
        key: rtlProperty,
        value: rtlValue
      } = core.convertProperty(property, value);
      ltrCSS += `${hyphenateProperty.hyphenateProperty(property)}:${value};`;
      rtlCSS += `${hyphenateProperty.hyphenateProperty(rtlProperty)}:${rtlValue};`;
      continue;
    }

    if (property === 'animationName' && typeof value === 'object') {
      const values = Array.isArray(value) ? value : [value];
      const ltrAnimationNames = [];
      const rtlAnimationNames = [];

      for (const keyframeObject of values) {
        const ltrKeyframeRule = compileKeyframeCSS.compileKeyframeRule(keyframeObject);
        const rtlKeyframeRule = compileKeyframeCSS.compileKeyframeRule(core.convert(keyframeObject));
        const ltrAnimationName = constants.RESET_HASH_PREFIX + hashString__default["default"](ltrKeyframeRule);
        const rtlAnimationName = constants.RESET_HASH_PREFIX + hashString__default["default"](rtlKeyframeRule);
        ltrAnimationNames.push(ltrAnimationName);
        rtlAnimationNames.push(rtlAnimationName);
        ltrCSS += compileKeyframeCSS.compileKeyframesCSS(ltrAnimationName, ltrKeyframeRule).join('');

        if (ltrAnimationName !== rtlAnimationName) {
          rtlCSS += compileKeyframeCSS.compileKeyframesCSS(rtlAnimationName, rtlKeyframeRule).join('');
        }
      }

      ltrCSS += `animation-name:${ltrAnimationNames.join(',')};`;
      rtlCSS += `animation-name:${rtlAnimationNames.join(',')};`;
      continue;
    }

    if (Array.isArray(value)) {
      // not animationName property but array in the value => fallback values
      if (value.length === 0) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`makeResetStyles(): An empty array was passed as input to "${property}", the property will be omitted in the styles.`);
        }

        continue;
      }

      const rtlDefinitions = value.map(v => core.convertProperty(property, v));
      const rtlPropertyConsistent = !rtlDefinitions.some(v => v.key !== rtlDefinitions[0].key);

      if (!rtlPropertyConsistent) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('makeStyles(): mixing CSS fallback values which result in multiple CSS properties in RTL is not supported.');
        }

        continue;
      }

      const rtlProperty = rtlDefinitions[0].key;
      ltrCSS += value.map(v => `${hyphenateProperty.hyphenateProperty(property)}:${v};`).join('');
      rtlCSS += rtlDefinitions.map(definition => `${hyphenateProperty.hyphenateProperty(rtlProperty)}:${definition.value};`).join('');
      continue;
    }

    if (isObject.isObject(value)) {
      if (isNestedSelector.isNestedSelector(property)) {
        const nestedSelector = compileCSS.normalizePseudoSelector(property);
        const [ltrNested, rtlNested] = createStringFromStyles(value);
        ltrCSS += `${nestedSelector}{${ltrNested}}`;
        rtlCSS += `${nestedSelector}{${rtlNested}}`;
        continue;
      }

      if (isMediaQuerySelector.isMediaQuerySelector(property) || isLayerSelector.isLayerSelector(property) || isSupportQuerySelector.isSupportQuerySelector(property)) {
        const [ltrNested, rtlNested] = createStringFromStyles(value);
        ltrCSS += `${property}{${ltrNested}}`;
        rtlCSS += `${property}{${rtlNested}}`;
        continue;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error(`Please fix the unresolved style rule: \n ${property} \n ${JSON.stringify(value, null, 2)}"`);
    }
  }

  return [ltrCSS, rtlCSS];
}
/**
 * @internal
 */


function resolveResetStyleRules(styles) {
  const [ltrRule, rtlRule] = createStringFromStyles(styles);
  const ltrClassName = constants.RESET_HASH_PREFIX + hashString__default["default"](ltrRule);
  const ltrCSS = compileCSS.compileCSSRules(`.${ltrClassName}{${ltrRule}}`);

  if (ltrRule === rtlRule) {
    return [ltrClassName, null, ltrCSS];
  }

  const rtlClassName = constants.RESET_HASH_PREFIX + hashString__default["default"](rtlRule);
  const rtlCSS = compileCSS.compileCSSRules(`.${rtlClassName}{${rtlRule}}`);
  return [ltrClassName, rtlClassName, ltrCSS.concat(rtlCSS)];
}

exports.resolveResetStyleRules = resolveResetStyleRules;
//# sourceMappingURL=resolveResetStyleRules.cjs.js.map
