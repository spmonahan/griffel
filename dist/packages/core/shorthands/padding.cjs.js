'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generateStyles = require('./generateStyles.cjs.js');

/**
 * A function that implements CSS spec conformant expansion for "padding"
 *
 * @example
 *   padding('10px')
 *   padding('10px', '5px')
 *   padding('2px', '4px', '8px')
 *   padding('1px', 0, '3px', '4px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/padding
 */

function padding(...values) {
  return generateStyles.generateStyles('padding', '', ...values);
}

exports.padding = padding;
//# sourceMappingURL=padding.cjs.js.map
