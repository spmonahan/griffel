import './constants.esm.js';
import { debugData } from './devtools/store.esm.js';
import { isDevToolsEnabled } from './devtools/isDevToolsEnabled.esm.js';
import { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots.esm.js';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms & DOM insertion.
 *
 * @internal
 */

function __css(classesMapBySlot) {
  let ltrClassNamesForSlots = null;
  let rtlClassNamesForSlots = null;

  function computeClasses(options) {
    const {
      dir
    } = options;
    const isLTR = dir === 'ltr';

    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        ltrClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }

    const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;

    if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled) {
      debugData.addSequenceDetails(classNamesForSlots);
    }

    return classNamesForSlots;
  }

  return computeClasses;
}

export { __css };
//# sourceMappingURL=__css.esm.js.map
