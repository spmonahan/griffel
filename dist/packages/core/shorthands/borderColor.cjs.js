'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generateStyles = require('./generateStyles.cjs.js');

/**
 * A function that implements CSS spec conformant expansion for "borderColor"
 *
 * @example
 *  borderColor('red')
 *  borderColor('red', 'blue')
 *  borderColor('red', 'blue', 'green')
 *  borderColor('red', 'blue', 'green', 'yellow')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
 */

function borderColor(...values) {
  return generateStyles.generateStyles('border', 'Color', ...values);
}

exports.borderColor = borderColor;
//# sourceMappingURL=borderColor.cjs.js.map
