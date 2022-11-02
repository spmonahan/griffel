'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * A function that implements expansion for "border-top", it's simplified - check usage examples.
 *
 * @example
 *  borderTop('2px')
 *  borderTop('2px', 'solid')
 *  borderTop('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-top
 */
function borderTop(...values) {
  return Object.assign(Object.assign({
    borderTopWidth: values[0]
  }, values[1] && {
    borderTopStyle: values[1]
  }), values[2] && {
    borderTopColor: values[2]
  });
}

exports.borderTop = borderTop;
//# sourceMappingURL=borderTop.cjs.js.map
