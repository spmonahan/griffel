'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generateStyles = require('./generateStyles.cjs.js');

/**
 * A function that implements CSS spec conformant expansion for "borderStyle"
 *
 * @example
 *  borderStyle('solid')
 *  borderStyle('solid', 'dashed')
 *  borderStyle('solid', 'dashed', 'dotted')
 *  borderStyle('solid', 'dashed', 'dotted', 'double')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
 */

function borderStyle(...values) {
  return generateStyles.generateStyles('border', 'Style', ...values);
}

exports.borderStyle = borderStyle;
//# sourceMappingURL=borderStyle.cjs.js.map
