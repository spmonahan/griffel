import { border } from './shorthands/border.esm.js';
import { borderLeft } from './shorthands/borderLeft.esm.js';
import { borderBottom } from './shorthands/borderBottom.esm.js';
import { borderRight } from './shorthands/borderRight.esm.js';
import { borderTop } from './shorthands/borderTop.esm.js';
import { borderColor } from './shorthands/borderColor.esm.js';
import { borderStyle } from './shorthands/borderStyle.esm.js';
import { borderRadius } from './shorthands/borderRadius.esm.js';
import { borderWidth } from './shorthands/borderWidth.esm.js';
import { flex } from './shorthands/flex.esm.js';
import { gap } from './shorthands/gap.esm.js';
import { gridArea } from './shorthands/gridArea.esm.js';
import { margin } from './shorthands/margin.esm.js';
import { padding } from './shorthands/padding.esm.js';
import { overflow } from './shorthands/overflow.esm.js';
import { inset } from './shorthands/inset.esm.js';
import { outline } from './shorthands/outline.esm.js';
import { transition } from './shorthands/transition.esm.js';
export { createDOMRenderer, defaultCompareMediaQueries } from './renderer/createDOMRenderer.esm.js';
export { rehydrateRendererCache } from './renderer/rehydrateRendererCache.esm.js';
export { mergeClasses } from './mergeClasses.esm.js';
export { makeStyles } from './makeStyles.esm.js';
export { makeStaticStyles } from './makeStaticStyles.esm.js';
export { makeResetStyles } from './makeResetStyles.esm.js';
export { resolveStyleRulesForSlots } from './resolveStyleRulesForSlots.esm.js';
export { __css } from './__css.esm.js';
export { __styles } from './__styles.esm.js';
export { __resetCSS } from './__resetCSS.esm.js';
export { __resetStyles } from './__resetStyles.esm.js';
export { normalizeCSSBucketEntry } from './runtime/utils/normalizeCSSBucketEntry.esm.js';
export { styleBucketOrdering } from './renderer/getStyleSheetForBucket.esm.js';
export { getStyleBucketName } from './runtime/getStyleBucketName.esm.js';
export { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots.esm.js';
export { resolveStyleRules } from './runtime/resolveStyleRules.esm.js';
export { resolveResetStyleRules } from './runtime/resolveResetStyleRules.esm.js';
export { DATA_BUCKET_ATTR, DEBUG_SEQUENCE_SEPARATOR, DEFINITION_LOOKUP_TABLE, HASH_PREFIX, LOOKUP_DEFINITIONS_INDEX, LOOKUP_DIR_INDEX, RESET_HASH_PREFIX, SEQUENCE_HASH_LENGTH, SEQUENCE_PREFIX, SEQUENCE_SIZE, UNSUPPORTED_CSS_PROPERTIES } from './constants.esm.js';

// This should be just "export * as shorthands from "
const shorthands = {
  border,
  borderLeft,
  borderBottom,
  borderRight,
  borderTop,
  borderColor,
  borderStyle,
  borderRadius,
  borderWidth,
  flex,
  gap,
  gridArea,
  margin,
  padding,
  overflow,
  inset,
  outline,
  transition
};

export { shorthands };
//# sourceMappingURL=index.esm.js.map
