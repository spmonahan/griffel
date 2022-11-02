import { DEFINITION_LOOKUP_TABLE } from '../constants.esm.js';
import { hashSequence } from './utils/hashSequence.esm.js';

/**
 * Reduces a classname map for slot to a classname string. Uses classnames according to text directions.
 *
 * @private
 */

function reduceToClassName(classMap, dir) {
  let className = ''; // eslint-disable-next-line guard-for-in

  for (const propertyHash in classMap) {
    const classNameMapping = classMap[propertyHash];

    if (classNameMapping) {
      const hasRTLClassName = Array.isArray(classNameMapping);

      if (dir === 'rtl') {
        className += (hasRTLClassName ? classNameMapping[1] : classNameMapping) + ' ';
      } else {
        className += (hasRTLClassName ? classNameMapping[0] : classNameMapping) + ' ';
      }
    }
  }

  return className.slice(0, -1);
}
/**
 * Reduces classname maps for slots to classname strings. Registers them in a definition cache to be used by
 * `mergeClasses()`.
 *
 * @internal
 */

function reduceToClassNameForSlots(classesMapBySlot, dir) {
  const classNamesForSlots = {}; // eslint-disable-next-line guard-for-in

  for (const slotName in classesMapBySlot) {
    const slotClasses = reduceToClassName(classesMapBySlot[slotName], dir); // Handles a case when there are no classes in a set i.e. "makeStyles({ root: {} })"

    if (slotClasses === '') {
      classNamesForSlots[slotName] = '';
      continue;
    }

    const sequenceHash = hashSequence(slotClasses, dir);
    const resultSlotClasses = sequenceHash + ' ' + slotClasses;
    DEFINITION_LOOKUP_TABLE[sequenceHash] = [classesMapBySlot[slotName], dir];
    classNamesForSlots[slotName] = resultSlotClasses;
  }

  return classNamesForSlots;
}

export { reduceToClassName, reduceToClassNameForSlots };
//# sourceMappingURL=reduceToClassNameForSlots.esm.js.map
