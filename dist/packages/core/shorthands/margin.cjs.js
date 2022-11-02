'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var generateStyles = require('./generateStyles.cjs.js');

/**
 * A function that implements CSS spec conformant expansion for "margin"
 *
 * @example
 *   margin('10px')
 *   margin('10px', '5px')
 *   margin('2px', '4px', '8px')
 *   margin('1px', 0, '3px', '4px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/margin
 */

function margin(...values) {
  return generateStyles.generateStyles('margin', '', ...values);
}

exports.margin = margin;
//# sourceMappingURL=margin.cjs.js.map
