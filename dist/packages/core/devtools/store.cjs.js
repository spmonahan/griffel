'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../constants.cjs.js');
var mergeClasses = require('../mergeClasses.cjs.js');

const sequenceDetails = {};
const cssRules = /*#__PURE__*/new Set();
const debugData = {
  getChildrenSequences: debugSequenceHash => {
    const key = Object.keys(mergeClasses.mergeClassesCachedResults).find(key => mergeClasses.mergeClassesCachedResults[key].startsWith(debugSequenceHash));

    if (key) {
      // key of the mergeClasses cache contains merge order
      return key.split(constants.SEQUENCE_PREFIX).filter(sequence => sequence.length).map(sequence => constants.SEQUENCE_PREFIX + sequence);
    }

    return [];
  },
  addCSSRule: rule => {
    cssRules.add(rule);
  },
  addSequenceDetails: (classNamesForSlots, sourceURL) => {
    Object.entries(classNamesForSlots).forEach(([slotName, sequenceHash]) => {
      sequenceDetails[sequenceHash.substring(0, constants.SEQUENCE_SIZE)] = {
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

exports.debugData = debugData;
//# sourceMappingURL=store.cjs.js.map
