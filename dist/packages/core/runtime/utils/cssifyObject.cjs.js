'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hyphenateProperty = require('./hyphenateProperty.cjs.js');

function cssifyObject(style) {
  let css = ''; // eslint-disable-next-line guard-for-in

  for (const property in style) {
    const value = style[property];

    if (typeof value !== 'string' && typeof value !== 'number') {
      continue;
    }

    css += hyphenateProperty.hyphenateProperty(property) + ':' + value + ';';
  }

  return css;
}

exports.cssifyObject = cssifyObject;
//# sourceMappingURL=cssifyObject.cjs.js.map
