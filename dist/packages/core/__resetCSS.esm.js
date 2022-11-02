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

export { __resetCSS };
//# sourceMappingURL=__resetCSS.esm.js.map
