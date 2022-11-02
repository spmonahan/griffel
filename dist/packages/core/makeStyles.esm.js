import './constants.esm.js';
import { debugData } from './devtools/store.esm.js';
import { isDevToolsEnabled } from './devtools/isDevToolsEnabled.esm.js';
import { getSourceURLfromError } from './devtools/getSourceURLfromError.esm.js';
import { resolveStyleRulesForSlots } from './resolveStyleRulesForSlots.esm.js';
import { reduceToClassNameForSlots } from './runtime/reduceToClassNameForSlots.esm.js';

function makeStyles(stylesBySlots) {
  const insertionCache = {};
  let classesMapBySlot = null;
  let cssRules = null;
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

    if (classesMapBySlot === null) {
      [classesMapBySlot, cssRules] = resolveStyleRulesForSlots(stylesBySlots);
    }

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

export { makeStyles };
//# sourceMappingURL=makeStyles.esm.js.map
