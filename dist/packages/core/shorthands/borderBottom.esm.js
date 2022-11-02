/**
 * A function that implements expansion for "border-bottom", it's simplified - check usage examples.
 *
 * @example
 *  borderBottom('2px')
 *  borderBottom('2px', 'solid')
 *  borderBottom('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-bottom
 */
function borderBottom(...values) {
  return Object.assign(Object.assign({
    borderBottomWidth: values[0]
  }, values[1] && {
    borderBottomStyle: values[1]
  }), values[2] && {
    borderBottomColor: values[2]
  });
}

export { borderBottom };
//# sourceMappingURL=borderBottom.esm.js.map
