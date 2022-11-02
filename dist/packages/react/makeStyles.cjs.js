'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@griffel/core');
var isInsideComponent = require('./utils/isInsideComponent.cjs.js');
var RendererContext = require('./RendererContext.cjs.js');
var TextDirectionContext = require('./TextDirectionContext.cjs.js');

function makeStyles(stylesBySlots) {
  const getStyles = core.makeStyles(stylesBySlots);

  if (process.env.NODE_ENV !== 'production') {
    if (isInsideComponent.isInsideComponent()) {
      throw new Error(["makeStyles(): this function cannot be called in component's scope.", 'All makeStyles() calls should be top level i.e. in a root scope of a file.'].join(' '));
    }
  }

  return function useClasses() {
    const dir = TextDirectionContext.useTextDirection();
    const renderer = RendererContext.useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}

exports.makeStyles = makeStyles;
//# sourceMappingURL=makeStyles.cjs.js.map
