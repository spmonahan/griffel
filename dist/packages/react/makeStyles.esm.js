import { makeStyles as makeStyles$1 } from '@griffel/core';
import { isInsideComponent } from './utils/isInsideComponent.esm.js';
import { useRenderer } from './RendererContext.esm.js';
import { useTextDirection } from './TextDirectionContext.esm.js';

function makeStyles(stylesBySlots) {
  const getStyles = makeStyles$1(stylesBySlots);

  if (process.env.NODE_ENV !== 'production') {
    if (isInsideComponent()) {
      throw new Error(["makeStyles(): this function cannot be called in component's scope.", 'All makeStyles() calls should be top level i.e. in a root scope of a file.'].join(' '));
    }
  }

  return function useClasses() {
    const dir = useTextDirection();
    const renderer = useRenderer();
    return getStyles({
      dir,
      renderer
    });
  };
}

export { makeStyles };
//# sourceMappingURL=makeStyles.esm.js.map
