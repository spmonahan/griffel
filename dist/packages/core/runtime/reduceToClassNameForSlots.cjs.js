'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../constants.cjs.js');
var hashSequence = require('./utils/hashSequence.cjs.js');

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

    const sequenceHash = hashSequence.hashSequence(slotClasses, dir);
    const resultSlotClasses = sequenceHash + ' ' + slotClasses;
    constants.DEFINITION_LOOKUP_TABLE[sequenceHash] = [classesMapBySlot[slotName], dir];
    classNamesForSlots[slotName] = resultSlotClasses;
  }

  return classNamesForSlots;
}

exports.reduceToClassName = reduceToClassName;
exports.reduceToClassNameForSlots = reduceToClassNameForSlots;
//# sourceMappingURL=reduceToClassNameForSlots.cjs.js.map
