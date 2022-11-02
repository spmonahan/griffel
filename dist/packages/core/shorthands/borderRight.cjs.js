'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * A function that implements expansion for "border-right", it's simplified - check usage examples.
 *
 * @example
 *  borderRight('2px')
 *  borderRight('2px', 'solid')
 *  borderRight('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-right
 */
function borderRight(...values) {
  return Object.assign(Object.assign({
    borderRightWidth: values[0]
  }, values[1] && {
    borderRightStyle: values[1]
  }), values[2] && {
    borderRightColor: values[2]
  });
}

exports.borderRight = borderRight;
//# sourceMappingURL=borderRight.cjs.js.map
