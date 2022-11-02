'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../constants.cjs.js');
var store = require('./store.cjs.js');
var utils = require('./utils.cjs.js');

function getDebugTree(debugSequenceHash, parentNode) {
  const lookupItem = constants.DEFINITION_LOOKUP_TABLE[debugSequenceHash];

  if (lookupItem === undefined) {
    return undefined;
  }

  const parentLookupItem = parentNode ? constants.DEFINITION_LOOKUP_TABLE[parentNode.sequenceHash] : undefined;
  const debugClassNames = utils.getDebugClassNames(lookupItem, parentLookupItem, parentNode === null || parentNode === void 0 ? void 0 : parentNode.debugClassNames, parentNode === null || parentNode === void 0 ? void 0 : parentNode.children);
  const node = {
    sequenceHash: debugSequenceHash,
    direction: lookupItem[1],
    children: [],
    debugClassNames
  };
  const childrenSequences = store.debugData.getChildrenSequences(node.sequenceHash);
  childrenSequences.reverse() // first process the overriding children that are merged last
  .forEach(sequence => {
    const child = getDebugTree(sequence, node);

    if (child) {
      node.children.push(child);
    }
  }); // if it's leaf (makeStyle node), get css rules

  if (!node.children.length) {
    node.rules = {};
    node.debugClassNames.forEach(({
      className
    }) => {
      const mapData = store.debugData.getSequenceDetails(debugSequenceHash);

      if (mapData) {
        node.slot = mapData.slotName;
        node.sourceURL = mapData.sourceURL;
      }

      const cssRule = store.debugData.getCSSRules().find(cssRule => {
        return cssRule.includes(className);
      });
      node.rules[className] = cssRule;
    });
  }

  return node;
}

exports.getDebugTree = getDebugTree;
//# sourceMappingURL=getDebugTree.cjs.js.map
