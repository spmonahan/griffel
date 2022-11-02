'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./constants.cjs.js');
var store = require('./devtools/store.cjs.js');
var isDevToolsEnabled = require('./devtools/isDevToolsEnabled.cjs.js');
var reduceToClassNameForSlots = require('./runtime/reduceToClassNameForSlots.cjs.js');

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
        ltrClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }

    const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;

    if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled.isDevToolsEnabled) {
      store.debugData.addSequenceDetails(classNamesForSlots);
    }

    return classNamesForSlots;
  }

  return computeClasses;
}

exports.__css = __css;
//# sourceMappingURL=__css.cjs.js.map
