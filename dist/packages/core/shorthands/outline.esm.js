/**
 * A function that implements expansion for "outline", it's simplified - check usage examples.
 *
 * @example
 *  outline('2px')
 *  outline('2px', 'solid')
 *  outline('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/outline
 *
 */
function outline(outlineWidth, outlineStyle, outlineColor) {
  return Object.assign(Object.assign({
    outlineWidth
  }, outlineStyle && {
    outlineStyle
  }), outlineColor && {
    outlineColor
  });
}

export { outline };
//# sourceMappingURL=outline.esm.js.map
