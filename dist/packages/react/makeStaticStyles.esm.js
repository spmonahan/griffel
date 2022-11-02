import { makeStaticStyles as makeStaticStyles$1 } from '@griffel/core';
import { useRenderer } from './RendererContext.esm.js';

function makeStaticStyles(styles) {
  const getStyles = makeStaticStyles$1(styles);

  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }

  return function useStaticStyles() {
    const renderer = useRenderer();
    const options = {
      renderer
    };
    return getStyles(options);
  };
}

export { makeStaticStyles };
//# sourceMappingURL=makeStaticStyles.esm.js.map
