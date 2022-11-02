import { serialize, compile, middleware, prefixer, stringify, rulesheet } from 'stylis';
import { cssifyObject } from './utils/cssifyObject.esm.js';

function compileKeyframeRule(keyframeObject) {
  let css = ''; // eslint-disable-next-line guard-for-in

  for (const percentage in keyframeObject) {
    css += `${percentage}{${cssifyObject(keyframeObject[percentage])}}`;
  }

  return css;
}
/**
 * Creates CSS rules for insertion from passed CSS.
 */

function compileKeyframesCSS(keyframeName, keyframeCSS) {
  const cssRule = `@keyframes ${keyframeName} {${keyframeCSS}}`;
  const rules = [];
  serialize(compile(cssRule), middleware([prefixer, stringify, // 💡 we are using `.insertRule()` API for DOM operations, which does not support
  // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
  // individual rules to be used with this API
  rulesheet(rule => rules.push(rule))]));
  return rules;
}

export { compileKeyframeRule, compileKeyframesCSS };
//# sourceMappingURL=compileKeyframeCSS.esm.js.map
