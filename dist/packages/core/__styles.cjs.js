'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./constants.cjs.js');
var store = require('./devtools/store.cjs.js');
var isDevToolsEnabled = require('./devtools/isDevToolsEnabled.cjs.js');
var getSourceURLfromError = require('./devtools/getSourceURLfromError.cjs.js');
var reduceToClassNameForSlots = require('./runtime/reduceToClassNameForSlots.cjs.js');

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */

function __styles(classesMapBySlot, cssRules) {
  const insertionCache = {};
  let ltrClassNamesForSlots = null;
  let rtlClassNamesForSlots = null;
  let sourceURL;

  if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled.isDevToolsEnabled) {
    sourceURL = getSourceURLfromError.getSourceURLfromError();
  }

  function computeClasses(options) {
    const {
      dir,
      renderer
    } = options;
    const isLTR = dir === 'ltr'; // As RTL classes are different they should have a different cache key for insertion

    const rendererId = isLTR ? renderer.id : renderer.id + 'r';

    if (isLTR) {
      if (ltrClassNamesForSlots === null) {
        ltrClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots.reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }

    if (insertionCache[rendererId] === undefined) {
      renderer.insertCSSRules(cssRules);
      insertionCache[rendererId] = true;
    }

    const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;

    if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled.isDevToolsEnabled) {
      store.debugData.addSequenceDetails(classNamesForSlots, sourceURL);
    }

    return classNamesForSlots;
  }

  return computeClasses;
}

exports.__styles = __styles;
//# sourceMappingURL=__styles.cjs.js.map
