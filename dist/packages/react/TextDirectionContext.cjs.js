'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
 * @private
 */

const TextDirectionContext = /*#__PURE__*/React__namespace.createContext('ltr');
/**
 * @public
 */

const TextDirectionProvider = ({
  children,
  dir
}) => {
  return /*#__PURE__*/React__namespace.createElement(TextDirectionContext.Provider, {
    value: dir
  }, children);
};
/**
 * Returns current directionality of the element's text.
 *
 * @private
 */

function useTextDirection() {
  return React__namespace.useContext(TextDirectionContext);
}

exports.TextDirectionProvider = TextDirectionProvider;
exports.useTextDirection = useTextDirection;
//# sourceMappingURL=TextDirectionContext.cjs.js.map
