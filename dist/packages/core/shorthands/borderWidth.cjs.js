'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generateStyles = require('./generateStyles.cjs.js');

/**
 * A function that implements CSS spec conformant expansion for "borderWidth"
 *
 * @example
 *   borderWidth('10px')
 *   borderWidth('10px', '5px')
 *   borderWidth('2px', '4px', '8px')
 *   borderWidth('1px', 0, '3px', '4px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
 */

function borderWidth(...values) {
  return generateStyles.generateStyles('border', 'Width', ...values);
}

exports.borderWidth = borderWidth;
//# sourceMappingURL=borderWidth.cjs.js.map
