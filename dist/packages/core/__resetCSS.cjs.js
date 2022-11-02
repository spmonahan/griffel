'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @internal
 */
function __resetCSS(ltrClassName, rtlClassName) {
  function computeClassName(options) {
    const {
      dir
    } = options;
    return dir === 'ltr' ? ltrClassName : rtlClassName || ltrClassName;
  }

  return computeClassName;
}

exports.__resetCSS = __resetCSS;
//# sourceMappingURL=__resetCSS.cjs.js.map
