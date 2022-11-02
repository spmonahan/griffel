'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var stylis = require('stylis');
var cssifyObject = require('./utils/cssifyObject.cjs.js');

function compileKeyframeRule(keyframeObject) {
  let css = ''; // eslint-disable-next-line guard-for-in

  for (const percentage in keyframeObject) {
    css += `${percentage}{${cssifyObject.cssifyObject(keyframeObject[percentage])}}`;
  }

  return css;
}
/**
 * Creates CSS rules for insertion from passed CSS.
 */

function compileKeyframesCSS(keyframeName, keyframeCSS) {
  const cssRule = `@keyframes ${keyframeName} {${keyframeCSS}}`;
  const rules = [];
  stylis.serialize(stylis.compile(cssRule), stylis.middleware([stylis.prefixer, stylis.stringify, // 💡 we are using `.insertRule()` API for DOM operations, which does not support
  // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
  // individual rules to be used with this API
  stylis.rulesheet(rule => rules.push(rule))]));
  return rules;
}

exports.compileKeyframeRule = compileKeyframeRule;
exports.compileKeyframesCSS = compileKeyframesCSS;
//# sourceMappingURL=compileKeyframeCSS.cjs.js.map
