import { __resetStyles as __resetStyles$1 } from '@griffel/core';
import { useRenderer } from './RendererContext.esm.js';
import { useTextDirection } from './TextDirectionContext.esm.js';

/**
 * A version of makeResetStyles() that accepts build output as an input and skips all runtime transforms.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/naming-convention

function __resetStyles(ltrClassName, rtlClassName, cssRules) {
  const getStyles = __resetStyles$1(ltrClassName, rtlClassName, cssRules);
  return function useClasses() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}

export { __resetStyles };
//# sourceMappingURL=__resetStyles.esm.js.map
