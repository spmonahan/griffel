'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@griffel/core');
var RendererContext = require('./RendererContext.cjs.js');
var TextDirectionContext = require('./TextDirectionContext.cjs.js');

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention

function __styles(classesMapBySlot, cssRules) {
  const getStyles = core.__styles(classesMapBySlot, cssRules);
  return function useClasses() {
    const dir = TextDirectionContext.useTextDirection();
    const renderer = RendererContext.useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}

exports.__styles = __styles;
//# sourceMappingURL=__styles.cjs.js.map
