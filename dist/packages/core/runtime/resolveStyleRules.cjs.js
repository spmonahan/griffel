'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashString = require('@emotion/hash');
var core = require('rtl-css-js/core');
var constants = require('../constants.cjs.js');
var compileCSS = require('./compileCSS.cjs.js');
var compileKeyframeCSS = require('./compileKeyframeCSS.cjs.js');
var generateCombinedMediaQuery = require('./utils/generateCombinedMediaQuery.cjs.js');
var isMediaQuerySelector = require('./utils/isMediaQuerySelector.cjs.js');
var isLayerSelector = require('./utils/isLayerSelector.cjs.js');
var isNestedSelector = require('./utils/isNestedSelector.cjs.js');
var isSupportQuerySelector = require('./utils/isSupportQuerySelector.cjs.js');
var normalizeNestedProperty = require('./utils/normalizeNestedProperty.cjs.js');
var isObject = require('./utils/isObject.cjs.js');
var getStyleBucketName = require('./getStyleBucketName.cjs.js');
var hashClassName = require('./utils/hashClassName.cjs.js');
var hashPropertyKey = require('./utils/hashPropertyKey.cjs.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hashString__default = /*#__PURE__*/_interopDefaultLegacy(hashString);

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
    if (constants.UNSUPPORTED_CSS_PROPERTIES.hasOwnProperty(property)) {
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
      const key = hashPropertyKey.hashPropertyKey(selectors, media, support, property);
      const className = hashClassName.hashClassName({
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
      } || core.convertProperty(property, value);
      const flippedInRtl = rtlDefinition.key !== property || rtlDefinition.value !== value;
      const rtlClassName = flippedInRtl ? hashClassName.hashClassName({
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
      const styleBucketName = getStyleBucketName.getStyleBucketName(selectors, layer, media, support);
      const [ltrCSS, rtlCSS] = compileCSS.compileCSS(Object.assign({
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
        const keyframeCSS = compileKeyframeCSS.compileKeyframeRule(keyframeObject);
        const rtlKeyframeCSS = compileKeyframeCSS.compileKeyframeRule(core.convert(keyframeObject));
        const animationName = constants.HASH_PREFIX + hashString__default["default"](keyframeCSS);
        let rtlAnimationName;
        const keyframeRules = compileKeyframeCSS.compileKeyframesCSS(animationName, keyframeCSS);
        let rtlKeyframeRules = [];

        if (keyframeCSS === rtlKeyframeCSS) {
          // If CSS for LTR & RTL are same we will re-use animationName from LTR to avoid duplication of rules in output
          rtlAnimationName = animationName;
        } else {
          rtlAnimationName = constants.HASH_PREFIX + hashString__default["default"](rtlKeyframeCSS);
          rtlKeyframeRules = compileKeyframeCSS.compileKeyframesCSS(rtlAnimationName, rtlKeyframeCSS);
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

      const key = hashPropertyKey.hashPropertyKey(selectors, media, support, property);
      const className = hashClassName.hashClassName({
        media,
        layer,
        value: value.map(v => (v !== null && v !== void 0 ? v : '').toString()).join(';'),
        support,
        selectors,
        property
      });
      const rtlDefinitions = value.map(v => core.convertProperty(property, v));
      const rtlPropertyConsistent = !rtlDefinitions.some(v => v.key !== rtlDefinitions[0].key);

      if (!rtlPropertyConsistent) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('makeStyles(): mixing CSS fallback values which result in multiple CSS properties in RTL is not supported.');
        }

        continue;
      }

      const flippedInRtl = rtlDefinitions[0].key !== property || rtlDefinitions.some((v, i) => v.value !== value[i]);
      const rtlClassName = flippedInRtl ? hashClassName.hashClassName({
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
      const styleBucketName = getStyleBucketName.getStyleBucketName(selectors, layer, media, support);
      const [ltrCSS, rtlCSS] = compileCSS.compileCSS(Object.assign({
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
    } else if (isObject.isObject(value)) {
      if (isNestedSelector.isNestedSelector(property)) {
        resolveStyleRules(value, selectors.concat(normalizeNestedProperty.normalizeNestedProperty(property)), media, layer, support, cssClassesMap, cssRulesByBucket);
      } else if (isMediaQuerySelector.isMediaQuerySelector(property)) {
        const combinedMediaQuery = generateCombinedMediaQuery.generateCombinedQuery(media, property.slice(6).trim());
        resolveStyleRules(value, selectors, combinedMediaQuery, layer, support, cssClassesMap, cssRulesByBucket);
      } else if (isLayerSelector.isLayerSelector(property)) {
        const combinedLayerQuery = (layer ? `${layer}.` : '') + property.slice(6).trim();
        resolveStyleRules(value, selectors, media, combinedLayerQuery, support, cssClassesMap, cssRulesByBucket);
      } else if (isSupportQuerySelector.isSupportQuerySelector(property)) {
        const combinedSupportQuery = generateCombinedMediaQuery.generateCombinedQuery(support, property.slice(9).trim());
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

exports.resolveStyleRules = resolveStyleRules;
//# sourceMappingURL=resolveStyleRules.cjs.js.map
