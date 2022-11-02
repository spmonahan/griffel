import './constants.esm.js';
import { debugData } from './devtools/store.esm.js';
import { isDevToolsEnabled } from './devtools/isDevToolsEnabled.esm.js';
import { getSourceURLfromError } from './devtools/getSourceURLfromError.esm.js';
import { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots.esm.js';

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

  if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled) {
    sourceURL = getSourceURLfromError();
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
        ltrClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    } else {
      if (rtlClassNamesForSlots === null) {
        rtlClassNamesForSlots = reduceToClassNameForSlots(classesMapBySlot, dir);
      }
    }

    if (insertionCache[rendererId] === undefined) {
      renderer.insertCSSRules(cssRules);
      insertionCache[rendererId] = true;
    }

    const classNamesForSlots = isLTR ? ltrClassNamesForSlots : rtlClassNamesForSlots;

    if (process.env.NODE_ENV !== 'production' && isDevToolsEnabled) {
      debugData.addSequenceDetails(classNamesForSlots, sourceURL);
    }

    return classNamesForSlots;
  }

  return computeClasses;
}

export { __styles };
//# sourceMappingURL=__styles.esm.js.map
