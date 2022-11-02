import { __css as __css$1 } from '@griffel/core';
import { useTextDirection } from './TextDirectionContext.esm.js';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms & DOM insertion.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention

function __css(classesMapBySlot) {
  const getStyles = __css$1(classesMapBySlot);
  return function useClasses() {
    const dir = useTextDirection();
    return getStyles({
      dir
    });
  };
}

export { __css };
//# sourceMappingURL=__css.esm.js.map
