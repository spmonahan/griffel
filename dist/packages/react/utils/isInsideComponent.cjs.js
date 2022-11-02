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

function isInsideComponent() {
  // React 18 always logs errors if a dispatcher is not present:
  // https://github.com/facebook/react/blob/42f15b324f50d0fd98322c21646ac3013e30344a/packages/react/src/ReactHooks.js#L26-L36
  try {
    // @ts-expect-error "SECRET_INTERNALS" are not typed
    const dispatcher = React__namespace.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentDispatcher.current; // Before any React component was rendered "dispatcher" will be "null"

    if (dispatcher === null || dispatcher === undefined) {
      return false;
    } // A check with hooks call (i.e. call "React.useContext()" outside a component) will always produce errors, but
    // a call on the dispatcher wont


    dispatcher.useContext({});
    return true;
  } catch (e) {
    return false;
  }
}

exports.isInsideComponent = isInsideComponent;
//# sourceMappingURL=isInsideComponent.cjs.js.map
