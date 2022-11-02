import { __styles as __styles$1 } from '@griffel/core';
import { useRenderer } from './RendererContext.esm.js';
import { useTextDirection } from './TextDirectionContext.esm.js';

/**
 * A version of makeStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention

function __styles(classesMapBySlot, cssRules) {
  const getStyles = __styles$1(classesMapBySlot, cssRules);
  return function useClasses() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}

export { __styles };
//# sourceMappingURL=__styles.esm.js.map
