import { SEQUENCE_PREFIX, SEQUENCE_SIZE } from '../constants.esm.js';
import { mergeClassesCachedResults } from '../mergeClasses.esm.js';

const sequenceDetails = {};
const cssRules = /*#__PURE__*/new Set();
const debugData = {
  getChildrenSequences: debugSequenceHash => {
    const key = Object.keys(mergeClassesCachedResults).find(key => mergeClassesCachedResults[key].startsWith(debugSequenceHash));

    if (key) {
      // key of the mergeClasses cache contains merge order
      return key.split(SEQUENCE_PREFIX).filter(sequence => sequence.length).map(sequence => SEQUENCE_PREFIX + sequence);
    }

    return [];
  },
  addCSSRule: rule => {
    cssRules.add(rule);
  },
  addSequenceDetails: (classNamesForSlots, sourceURL) => {
    Object.entries(classNamesForSlots).forEach(([slotName, sequenceHash]) => {
      sequenceDetails[sequenceHash.substring(0, SEQUENCE_SIZE)] = {
        slotName,
        sourceURL
      };
    });
  },
  getCSSRules: () => {
    return Array.from(cssRules);
  },
  getSequenceDetails: sequenceHash => {
    return sequenceDetails[sequenceHash];
  }
};

export { debugData };
//# sourceMappingURL=store.esm.js.map
