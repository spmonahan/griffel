'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@griffel/core');
var isInsideComponent = require('./utils/isInsideComponent.cjs.js');
var RendererContext = require('./RendererContext.cjs.js');
var TextDirectionContext = require('./TextDirectionContext.cjs.js');

function makeResetStyles(styles) {
  const getStyles = core.makeResetStyles(styles);

  if (process.env.NODE_ENV !== 'production') {
    if (isInsideComponent.isInsideComponent()) {
      throw new Error(["makeResetStyles(): this function cannot be called in component's scope.", 'All makeResetStyles() calls should be top level i.e. in a root scope of a file.'].join(' '));
    }
  }

  return function useClassName() {
    const dir = TextDirectionContext.useTextDirection();
    const renderer = RendererContext.useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}

exports.makeResetStyles = makeResetStyles;
//# sourceMappingURL=makeResetStyles.cjs.js.map
