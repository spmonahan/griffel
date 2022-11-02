'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var border = require('./shorthands/border.cjs.js');
var borderLeft = require('./shorthands/borderLeft.cjs.js');
var borderBottom = require('./shorthands/borderBottom.cjs.js');
var borderRight = require('./shorthands/borderRight.cjs.js');
var borderTop = require('./shorthands/borderTop.cjs.js');
var borderColor = require('./shorthands/borderColor.cjs.js');
var borderStyle = require('./shorthands/borderStyle.cjs.js');
var borderRadius = require('./shorthands/borderRadius.cjs.js');
var borderWidth = require('./shorthands/borderWidth.cjs.js');
var flex = require('./shorthands/flex.cjs.js');
var gap = require('./shorthands/gap.cjs.js');
var gridArea = require('./shorthands/gridArea.cjs.js');
var margin = require('./shorthands/margin.cjs.js');
var padding = require('./shorthands/padding.cjs.js');
var overflow = require('./shorthands/overflow.cjs.js');
var inset = require('./shorthands/inset.cjs.js');
var outline = require('./shorthands/outline.cjs.js');
var transition = require('./shorthands/transition.cjs.js');
var createDOMRenderer = require('./renderer/createDOMRenderer.cjs.js');
var rehydrateRendererCache = require('./renderer/rehydrateRendererCache.cjs.js');
var mergeClasses = require('./mergeClasses.cjs.js');
var makeStyles = require('./makeStyles.cjs.js');
var makeStaticStyles = require('./makeStaticStyles.cjs.js');
var makeResetStyles = require('./makeResetStyles.cjs.js');
var resolveStyleRulesForSlots = require('./resolveStyleRulesForSlots.cjs.js');
var __css = require('./__css.cjs.js');
var __styles = require('./__styles.cjs.js');
var __resetCSS = require('./__resetCSS.cjs.js');
var __resetStyles = require('./__resetStyles.cjs.js');
var normalizeCSSBucketEntry = require('./runtime/utils/normalizeCSSBucketEntry.cjs.js');
var getStyleSheetForBucket = require('./renderer/getStyleSheetForBucket.cjs.js');
var getStyleBucketName = require('./runtime/getStyleBucketName.cjs.js');
var reduceToClassNameForSlots = require('./runtime/reduceToClassNameForSlots.cjs.js');
var resolveStyleRules = require('./runtime/resolveStyleRules.cjs.js');
var resolveResetStyleRules = require('./runtime/resolveResetStyleRules.cjs.js');
var constants = require('./constants.cjs.js');

// This should be just "export * as shorthands from "
const shorthands = {
  border: border.border,
  borderLeft: borderLeft.borderLeft,
  borderBottom: borderBottom.borderBottom,
  borderRight: borderRight.borderRight,
  borderTop: borderTop.borderTop,
  borderColor: borderColor.borderColor,
  borderStyle: borderStyle.borderStyle,
  borderRadius: borderRadius.borderRadius,
  borderWidth: borderWidth.borderWidth,
  flex: flex.flex,
  gap: gap.gap,
  gridArea: gridArea.gridArea,
  margin: margin.margin,
  padding: padding.padding,
  overflow: overflow.overflow,
  inset: inset.inset,
  outline: outline.outline,
  transition: transition.transition
};

exports.createDOMRenderer = createDOMRenderer.createDOMRenderer;
exports.defaultCompareMediaQueries = createDOMRenderer.defaultCompareMediaQueries;
exports.rehydrateRendererCache = rehydrateRendererCache.rehydrateRendererCache;
exports.mergeClasses = mergeClasses.mergeClasses;
exports.makeStyles = makeStyles.makeStyles;
exports.makeStaticStyles = makeStaticStyles.makeStaticStyles;
exports.makeResetStyles = makeResetStyles.makeResetStyles;
exports.resolveStyleRulesForSlots = resolveStyleRulesForSlots.resolveStyleRulesForSlots;
exports.__css = __css.__css;
exports.__styles = __styles.__styles;
exports.__resetCSS = __resetCSS.__resetCSS;
exports.__resetStyles = __resetStyles.__resetStyles;
exports.normalizeCSSBucketEntry = normalizeCSSBucketEntry.normalizeCSSBucketEntry;
exports.styleBucketOrdering = getStyleSheetForBucket.styleBucketOrdering;
exports.getStyleBucketName = getStyleBucketName.getStyleBucketName;
exports.reduceToClassNameForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots;
exports.resolveStyleRules = resolveStyleRules.resolveStyleRules;
exports.resolveResetStyleRules = resolveResetStyleRules.resolveResetStyleRules;
exports.DATA_BUCKET_ATTR = constants.DATA_BUCKET_ATTR;
exports.DEBUG_SEQUENCE_SEPARATOR = constants.DEBUG_SEQUENCE_SEPARATOR;
exports.DEFINITION_LOOKUP_TABLE = constants.DEFINITION_LOOKUP_TABLE;
exports.HASH_PREFIX = constants.HASH_PREFIX;
exports.LOOKUP_DEFINITIONS_INDEX = constants.LOOKUP_DEFINITIONS_INDEX;
exports.LOOKUP_DIR_INDEX = constants.LOOKUP_DIR_INDEX;
exports.RESET_HASH_PREFIX = constants.RESET_HASH_PREFIX;
exports.SEQUENCE_HASH_LENGTH = constants.SEQUENCE_HASH_LENGTH;
exports.SEQUENCE_PREFIX = constants.SEQUENCE_PREFIX;
exports.SEQUENCE_SIZE = constants.SEQUENCE_SIZE;
exports.UNSUPPORTED_CSS_PROPERTIES = constants.UNSUPPORTED_CSS_PROPERTIES;
exports.shorthands = shorthands;
//# sourceMappingURL=index.cjs.js.map
