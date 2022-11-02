'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * A function that implements expansion for "border-left", it's simplified - check usage examples.
 *
 * @example
 *  borderLeft('2px')
 *  borderLeft('2px', 'solid')
 *  borderLeft('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-left
 */
function borderLeft(...values) {
  return Object.assign(Object.assign({
    borderLeftWidth: values[0]
  }, values[1] && {
    borderLeftStyle: values[1]
  }), values[2] && {
    borderLeftColor: values[2]
  });
}

exports.borderLeft = borderLeft;
//# sourceMappingURL=borderLeft.cjs.js.map
