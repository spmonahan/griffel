import hashString from '@emotion/hash';
import { convertProperty, convert } from 'rtl-css-js/core';
import { UNSUPPORTED_CSS_PROPERTIES, HASH_PREFIX } from '../constants.esm.js';
import { compileCSS } from './compileCSS.esm.js';
import { compileKeyframeRule, compileKeyframesCSS } from './compileKeyframeCSS.esm.js';
import { generateCombinedQuery } from './utils/generateCombinedMediaQuery.esm.js';
import { isMediaQuerySelector } from './utils/isMediaQuerySelector.esm.js';
import { isLayerSelector } from './utils/isLayerSelector.esm.js';
import { isNestedSelector } from './utils/isNestedSelector.esm.js';
import { isSupportQuerySelector } from './utils/isSupportQuerySelector.esm.js';
import { normalizeNestedProperty } from './utils/normalizeNestedProperty.esm.js';
import { isObject } from './utils/isObject.esm.js';
import { getStyleBucketName } from './getStyleBucketName.esm.js';
import { hashClassName } from './utils/hashClassName.esm.js';
import { hashPropertyKey } from './utils/hashPropertyKey.esm.js';

function pushToClassesMap(classesMap, propertyKey, ltrClassname, rtlClassname) {
  classesMap[propertyKey] = rtlClassname ? [ltrClassname, rtlClassname] : ltrClassname;
}

function createBucketEntry(cssRule, metadata) {
  if (metadata) {
    return [cssRule, metadata];
  }

  return cssRule;
}

function pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media) {
  var _a;

  let metadata;

  if (styleBucketName === 'm' && media) {
    metadata = {
      m: media
    };
  }

  (_a = cssRulesByBucket[styleBucketName]) !== null && _a !== void 0 ? _a : cssRulesByBucket[styleBucketName] = [];
  cssRulesByBucket[styleBucketName].push(createBucketEntry(ltrCSS, metadata));

  if (rtlCSS) {
    cssRulesByBucket[styleBucketName].push(createBucketEntry(rtlCSS, metadata));
  }
}
/**
 * Transforms input styles to classes maps & CSS rules.
 *
 * @internal
 */


function resolveStyleRules(styles, selectors = [], media = '', layer = '', support = '', cssClassesMap = {}, cssRulesByBucket = {}, rtlValue) {
  // eslint-disable-next-line guard-for-in
  for (const property in styles) {
    // eslint-disable-next-line no-prototype-builtins
    if (UNSUPPORTED_CSS_PROPERTIES.hasOwnProperty(property)) {
      if (process.env.NODE_ENV !== 'production') {
        console.error([`@griffel/react: You are using unsupported shorthand CSS property "${property}". ` + `Please check your "makeStyles" calls, there *should not* be following:`, ' '.repeat(2) + `makeStyles({`, ' '.repeat(4) + `[slot]: { ${property}: "${styles[property]}" }`, ' '.repeat(2) + `})`, '', 'Learn why CSS shorthands are not supported: https://aka.ms/griffel-css-shorthands'].join('\n'));
      }

      continue;
    }

    const value = styles[property]; // eslint-disable-next-line eqeqeq

    if (value == null) {
      continue;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      // uniq key based on a hash of property & selector, used for merging later
      const key = hashPropertyKey(selectors, media, support, property);
      const className = hashClassName({
        media,
        layer,
        value: value.toString(),
        support,
        selectors,
        property
      });
      const rtlDefinition = rtlValue && {
        key: property,
        value: rtlValue
      } || convertProperty(property, value);
      const flippedInRtl = rtlDefinition.key !== property || rtlDefinition.value !== value;
      const rtlClassName = flippedInRtl ? hashClassName({
        value: rtlDefinition.value.toString(),
        property: rtlDefinition.key,
        selectors,
        media,
        layer,
        support
      }) : undefined;
      const rtlCompileOptions = flippedInRtl ? {
        rtlClassName,
        rtlProperty: rtlDefinition.key,
        rtlValue: rtlDefinition.value
      } : undefined;
      const styleBucketName = getStyleBucketName(selectors, layer, media, support);
      const [ltrCSS, rtlCSS] = compileCSS(Object.assign({
        className,
        media,
        layer,
        selectors,
        property,
        support,
        value
      }, rtlCompileOptions));
      pushToClassesMap(cssClassesMap, key, className, rtlClassName);
      pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media);
    } else if (property === 'animationName') {
      const animationNameValue = Array.isArray(value) ? value : [value];
      const animationNames = [];
      const rtlAnimationNames = [];

      for (const keyframeObject of animationNameValue) {
        const keyframeCSS = compileKeyframeRule(keyframeObject);
        const rtlKeyframeCSS = compileKeyframeRule(convert(keyframeObject));
        const animationName = HASH_PREFIX + hashString(keyframeCSS);
        let rtlAnimationName;
        const keyframeRules = compileKeyframesCSS(animationName, keyframeCSS);
        let rtlKeyframeRules = [];

        if (keyframeCSS === rtlKeyframeCSS) {
          // If CSS for LTR & RTL are same we will re-use animationName from LTR to avoid duplication of rules in output
          rtlAnimationName = animationName;
        } else {
          rtlAnimationName = HASH_PREFIX + hashString(rtlKeyframeCSS);
          rtlKeyframeRules = compileKeyframesCSS(rtlAnimationName, rtlKeyframeCSS);
        }

        for (let i = 0; i < keyframeRules.length; i++) {
          pushToCSSRules(cssRulesByBucket, // keyframes styles should be inserted into own bucket
          'k', keyframeRules[i], rtlKeyframeRules[i], media);
        }

        animationNames.push(animationName);
        rtlAnimationNames.push(rtlAnimationName);
      }

      resolveStyleRules({
        animationName: animationNames.join(', ')
      }, selectors, media, layer, support, cssClassesMap, cssRulesByBucket, rtlAnimationNames.join(', '));
    } else if (Array.isArray(value)) {
      // not animationName property but array in the value => fallback values
      if (value.length === 0) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`makeStyles(): An empty array was passed as input to "${property}", the property will be omitted in the styles.`);
        }

        continue;
      }

      const key = hashPropertyKey(selectors, media, support, property);
      const className = hashClassName({
        media,
        layer,
        value: value.map(v => (v !== null && v !== void 0 ? v : '').toString()).join(';'),
        support,
        selectors,
        property
      });
      const rtlDefinitions = value.map(v => convertProperty(property, v));
      const rtlPropertyConsistent = !rtlDefinitions.some(v => v.key !== rtlDefinitions[0].key);

      if (!rtlPropertyConsistent) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('makeStyles(): mixing CSS fallback values which result in multiple CSS properties in RTL is not supported.');
        }

        continue;
      }

      const flippedInRtl = rtlDefinitions[0].key !== property || rtlDefinitions.some((v, i) => v.value !== value[i]);
      const rtlClassName = flippedInRtl ? hashClassName({
        value: rtlDefinitions.map(v => {
          var _a;

          return ((_a = v === null || v === void 0 ? void 0 : v.value) !== null && _a !== void 0 ? _a : '').toString();
        }).join(';'),
        property: rtlDefinitions[0].key,
        selectors,
        layer,
        media,
        support
      }) : undefined;
      const rtlCompileOptions = flippedInRtl ? {
        rtlClassName,
        rtlProperty: rtlDefinitions[0].key,
        rtlValue: rtlDefinitions.map(d => d.value)
      } : undefined;
      const styleBucketName = getStyleBucketName(selectors, layer, media, support);
      const [ltrCSS, rtlCSS] = compileCSS(Object.assign({
        className,
        media,
        layer,
        selectors,
        property,
        support,
        value: value
      }, rtlCompileOptions));
      pushToClassesMap(cssClassesMap, key, className, rtlClassName);
      pushToCSSRules(cssRulesByBucket, styleBucketName, ltrCSS, rtlCSS, media);
    } else if (isObject(value)) {
      if (isNestedSelector(property)) {
        resolveStyleRules(value, selectors.concat(normalizeNestedProperty(property)), media, layer, support, cssClassesMap, cssRulesByBucket);
      } else if (isMediaQuerySelector(property)) {
        const combinedMediaQuery = generateCombinedQuery(media, property.slice(6).trim());
        resolveStyleRules(value, selectors, combinedMediaQuery, layer, support, cssClassesMap, cssRulesByBucket);
      } else if (isLayerSelector(property)) {
        const combinedLayerQuery = (layer ? `${layer}.` : '') + property.slice(6).trim();
        resolveStyleRules(value, selectors, media, combinedLayerQuery, support, cssClassesMap, cssRulesByBucket);
      } else if (isSupportQuerySelector(property)) {
        const combinedSupportQuery = generateCombinedQuery(support, property.slice(9).trim());
        resolveStyleRules(value, selectors, media, layer, combinedSupportQuery, cssClassesMap, cssRulesByBucket);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.error(`Please fix the unresolved style rule: \n ${property} \n ${JSON.stringify(value, null, 2)}"`);
        }
      }
    }
  }

  return [cssClassesMap, cssRulesByBucket];
}

export { resolveStyleRules };
//# sourceMappingURL=resolveStyleRules.esm.js.map
