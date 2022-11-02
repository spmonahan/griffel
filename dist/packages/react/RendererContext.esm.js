import { rehydrateRendererCache, createDOMRenderer } from '@griffel/core';
import * as React from 'react';

/**
 * Verifies if an application can use DOM.
 */

function canUseDOM() {
  return typeof window !== 'undefined' && !!(window.document && window.document.createElement);
}
/**
 * @private
 */


const RendererContext = /*#__PURE__*/React.createContext( /*#__PURE__*/createDOMRenderer());
/**
 * @public
 */

const RendererProvider = ({
  children,
  renderer,
  targetDocument
}) => {
  if (canUseDOM()) {
    // This if statement technically breaks the rules of hooks, but is safe because the condition never changes after
    // mounting.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    React.useMemo(() => {
      // "rehydrateCache()" can't be called in effects as it needs to be called before any component will be rendered to
      // avoid double insertion of classes
      rehydrateRendererCache(renderer, targetDocument);
    }, [renderer, targetDocument]);
  }

  return /*#__PURE__*/React.createElement(RendererContext.Provider, {
    value: renderer
  }, children);
};
/**
 * Returns an instance of current makeStyles() renderer.
 *
 * @private Exported as "useRenderer_unstable" use it on own risk. Can be changed or removed without a notice.
 */

function useRenderer() {
  return React.useContext(RendererContext);
}

export { RendererProvider, useRenderer };
//# sourceMappingURL=RendererContext.esm.js.map
