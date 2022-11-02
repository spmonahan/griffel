'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var constants = require('../constants.cjs.js');
var getDebugTree = require('./getDebugTree.cjs.js');

function injectDevTools(document) {
  const window = document.defaultView;

  if (!window || window.__GRIFFEL_DEVTOOLS__) {
    return;
  }

  const devtools = {
    getInfo: element => {
      const rootDebugSequenceHash = Array.from(element.classList).find(className => className.startsWith(constants.SEQUENCE_PREFIX));

      if (rootDebugSequenceHash === undefined) {
        return undefined;
      }

      return getDebugTree.getDebugTree(rootDebugSequenceHash);
    }
  };
  Object.defineProperty(window, '__GRIFFEL_DEVTOOLS__', {
    configurable: false,
    enumerable: false,

    get() {
      return devtools;
    }

  });
}

exports.injectDevTools = injectDevTools;
//# sourceMappingURL=injectDevTools.cjs.js.map
