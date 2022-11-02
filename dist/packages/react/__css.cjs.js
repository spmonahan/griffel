'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@griffel/core');
var TextDirectionContext = require('./TextDirectionContext.cjs.js');

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms & DOM insertion.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention

function __css(classesMapBySlot) {
  const getStyles = core.__css(classesMapBySlot);
  return function useClasses() {
    const dir = TextDirectionContext.useTextDirection();
    return getStyles({
      dir
    });
  };
}

exports.__css = __css;
//# sourceMappingURL=__css.cjs.js.map
