'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@griffel/core');
var RendererContext = require('./RendererContext.cjs.js');

function makeStaticStyles(styles) {
  const getStyles = core.makeStaticStyles(styles);

  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  return function useStaticStyles() {
    const renderer = RendererContext.useRenderer();
    const options = {
      renderer
    };
    return getStyles(options);
  };
}

exports.makeStaticStyles = makeStaticStyles;
//# sourceMappingURL=makeStaticStyles.cjs.js.map
