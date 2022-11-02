import { SEQUENCE_PREFIX } from '../constants.esm.js';
import { getDebugTree } from './getDebugTree.esm.js';

function injectDevTools(document) {
  const window = document.defaultView;

  if (!window || window.__GRIFFEL_DEVTOOLS__) {
    return;
  }

  const devtools = {
    getInfo: element => {
      const rootDebugSequenceHash = Array.from(element.classList).find(className => className.startsWith(SEQUENCE_PREFIX));

      if (rootDebugSequenceHash === undefined) {
        return undefined;
      }

      return getDebugTree(rootDebugSequenceHash);
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

export { injectDevTools };
//# sourceMappingURL=injectDevTools.esm.js.map
