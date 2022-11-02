'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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

exports.outline = outline;
//# sourceMappingURL=outline.cjs.js.map
