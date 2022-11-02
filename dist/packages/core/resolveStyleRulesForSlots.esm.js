import { resolveStyleRules } from './runtime/resolveStyleRules.esm.js';

/**
 * Calls resolveStyleRules() for each slot, is also used by build time transform.
 *
 * @param stylesBySlots - An object with makeStyles rules where a key is a slot name
 *
 * @return - A tuple with an object classnames mapping where a key is a slot name and an array with CSS rules
 */

function resolveStyleRulesForSlots(stylesBySlots) {
  const classesMapBySlot = {};
  const cssRules = {}; // eslint-disable-next-line guard-for-in

  for (const slotName in stylesBySlots) {
    const slotStyles = stylesBySlots[slotName];
    const [cssClassMap, cssRulesByBucket] = resolveStyleRules(slotStyles);
    classesMapBySlot[slotName] = cssClassMap;
    Object.keys(cssRulesByBucket).forEach(styleBucketName => {
      cssRules[styleBucketName] = (cssRules[styleBucketName] || []).concat(cssRulesByBucket[styleBucketName]);
    });
  }

  return [classesMapBySlot, cssRules];
}

export { resolveStyleRulesForSlots };
//# sourceMappingURL=resolveStyleRulesForSlots.esm.js.map
