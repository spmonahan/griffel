import { DEFINITION_LOOKUP_TABLE } from '../constants.esm.js';
import { debugData } from './store.esm.js';
import { getDebugClassNames } from './utils.esm.js';

function getDebugTree(debugSequenceHash, parentNode) {
  const lookupItem = DEFINITION_LOOKUP_TABLE[debugSequenceHash];

  if (lookupItem === undefined) {
    return undefined;
  }

  const parentLookupItem = parentNode ? DEFINITION_LOOKUP_TABLE[parentNode.sequenceHash] : undefined;
  const debugClassNames = getDebugClassNames(lookupItem, parentLookupItem, parentNode === null || parentNode === void 0 ? void 0 : parentNode.debugClassNames, parentNode === null || parentNode === void 0 ? void 0 : parentNode.children);
  const node = {
    sequenceHash: debugSequenceHash,
    direction: lookupItem[1],
    children: [],
    debugClassNames
  };
  const childrenSequences = debugData.getChildrenSequences(node.sequenceHash);
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
      const mapData = debugData.getSequenceDetails(debugSequenceHash);

      if (mapData) {
        node.slot = mapData.slotName;
        node.sourceURL = mapData.sourceURL;
      }

      const cssRule = debugData.getCSSRules().find(cssRule => {
        return cssRule.includes(className);
      });
      node.rules[className] = cssRule;
    });
  }

  return node;
}

export { getDebugTree };
//# sourceMappingURL=getDebugTree.esm.js.map
