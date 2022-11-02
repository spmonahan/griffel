import { makeResetStyles as makeResetStyles$1 } from '@griffel/core';
import { isInsideComponent } from './utils/isInsideComponent.esm.js';
import { useRenderer } from './RendererContext.esm.js';
import { useTextDirection } from './TextDirectionContext.esm.js';

function makeResetStyles(styles) {
  const getStyles = makeResetStyles$1(styles);

  if (process.env.NODE_ENV !== 'production') {
    if (isInsideComponent()) {
      throw new Error(["makeResetStyles(): this function cannot be called in component's scope.", 'All makeResetStyles() calls should be top level i.e. in a root scope of a file.'].join(' '));
    }
  }

  return function useClassName() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}

export { makeResetStyles };
//# sourceMappingURL=makeResetStyles.esm.js.map
