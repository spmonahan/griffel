'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@griffel/core');
var React = require('react');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var React__namespace = /*#__PURE__*/_interopNamespace(React);

/**
 * Verifies if an application can use DOM.
 */

function canUseDOM() {
  return typeof window !== 'undefined' && !!(window.document && window.document.createElement);
}
/**
 * @private
 */


const RendererContext = /*#__PURE__*/React__namespace.createContext( /*#__PURE__*/core.createDOMRenderer());
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
    React__namespace.useMemo(() => {
      // "rehydrateCache()" can't be called in effects as it needs to be called before any component will be rendered to
      // avoid double insertion of classes
      core.rehydrateRendererCache(renderer, targetDocument);
    }, [renderer, targetDocument]);
  }

  return /*#__PURE__*/React__namespace.createElement(RendererContext.Provider, {
    value: renderer
  }, children);
};
/**
 * Returns an instance of current makeStyles() renderer.
 *
 * @private Exported as "useRenderer_unstable" use it on own risk. Can be changed or removed without a notice.
 */

function useRenderer() {
  return React__namespace.useContext(RendererContext);
}

exports.RendererProvider = RendererProvider;
exports.useRenderer = useRenderer;
//# sourceMappingURL=RendererContext.cjs.js.map
