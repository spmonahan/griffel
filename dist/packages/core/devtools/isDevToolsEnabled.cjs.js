'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isDevToolsEnabled = /*#__PURE__*/(() => {
  var _a; // Accessing "window.sessionStorage" causes an exception when third party cookies are blocked
  // https://stackoverflow.com/questions/30481516/iframe-in-chrome-error-failed-to-read-localstorage-from-window-access-deni


  try {
    return Boolean(typeof window !== 'undefined' && ((_a = window.sessionStorage) === null || _a === void 0 ? void 0 : _a.getItem('__GRIFFEL_DEVTOOLS__')));
  } catch (e) {
    return false;
  }
})();

exports.isDevToolsEnabled = isDevToolsEnabled;
//# sourceMappingURL=isDevToolsEnabled.cjs.js.map
