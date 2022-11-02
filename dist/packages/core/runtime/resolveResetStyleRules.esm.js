import hashString from '@emotion/hash';
import { convertProperty, convert } from 'rtl-css-js/core';
import { RESET_HASH_PREFIX } from '../constants.esm.js';
import { isMediaQuerySelector } from './utils/isMediaQuerySelector.esm.js';
import { isLayerSelector } from './utils/isLayerSelector.esm.js';
import { isNestedSelector } from './utils/isNestedSelector.esm.js';
import { isSupportQuerySelector } from './utils/isSupportQuerySelector.esm.js';
import { isObject } from './utils/isObject.esm.js';
import { hyphenateProperty } from './utils/hyphenateProperty.esm.js';
import { compileCSSRules, normalizePseudoSelector } from './compileCSS.esm.js';
import { compileKeyframeRule, compileKeyframesCSS } from './compileKeyframeCSS.esm.js';

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
      } = convertProperty(property, value);
      ltrCSS += `${hyphenateProperty(property)}:${value};`;
      rtlCSS += `${hyphenateProperty(rtlProperty)}:${rtlValue};`;
      continue;
    }

    if (property === 'animationName' && typeof value === 'object') {
      const values = Array.isArray(value) ? value : [value];
      const ltrAnimationNames = [];
      const rtlAnimationNames = [];

      for (const keyframeObject of values) {
        const ltrKeyframeRule = compileKeyframeRule(keyframeObject);
        const rtlKeyframeRule = compileKeyframeRule(convert(keyframeObject));
        const ltrAnimationName = RESET_HASH_PREFIX + hashString(ltrKeyframeRule);
        const rtlAnimationName = RESET_HASH_PREFIX + hashString(rtlKeyframeRule);
        ltrAnimationNames.push(ltrAnimationName);
        rtlAnimationNames.push(rtlAnimationName);
        ltrCSS += compileKeyframesCSS(ltrAnimationName, ltrKeyframeRule).join('');

        if (ltrAnimationName !== rtlAnimationName) {
          rtlCSS += compileKeyframesCSS(rtlAnimationName, rtlKeyframeRule).join('');
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

      const rtlDefinitions = value.map(v => convertProperty(property, v));
      const rtlPropertyConsistent = !rtlDefinitions.some(v => v.key !== rtlDefinitions[0].key);

      if (!rtlPropertyConsistent) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('makeStyles(): mixing CSS fallback values which result in multiple CSS properties in RTL is not supported.');
        }

        continue;
      }

      const rtlProperty = rtlDefinitions[0].key;
      ltrCSS += value.map(v => `${hyphenateProperty(property)}:${v};`).join('');
      rtlCSS += rtlDefinitions.map(definition => `${hyphenateProperty(rtlProperty)}:${definition.value};`).join('');
      continue;
    }

    if (isObject(value)) {
      if (isNestedSelector(property)) {
        const nestedSelector = normalizePseudoSelector(property);
        const [ltrNested, rtlNested] = createStringFromStyles(value);
        ltrCSS += `${nestedSelector}{${ltrNested}}`;
        rtlCSS += `${nestedSelector}{${rtlNested}}`;
        continue;
      }

      if (isMediaQuerySelector(property) || isLayerSelector(property) || isSupportQuerySelector(property)) {
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
  const ltrClassName = RESET_HASH_PREFIX + hashString(ltrRule);
  const ltrCSS = compileCSSRules(`.${ltrClassName}{${ltrRule}}`);

  if (ltrRule === rtlRule) {
    return [ltrClassName, null, ltrCSS];
  }

  const rtlClassName = RESET_HASH_PREFIX + hashString(rtlRule);
  const rtlCSS = compileCSSRules(`.${rtlClassName}{${rtlRule}}`);
  return [ltrClassName, rtlClassName, ltrCSS.concat(rtlCSS)];
}

export { resolveResetStyleRules };
//# sourceMappingURL=resolveResetStyleRules.esm.js.map
