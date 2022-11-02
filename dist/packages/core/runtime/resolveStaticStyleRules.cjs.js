'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var compileStaticCSS = require('./compileStaticCSS.cjs.js');
var compileCSS = require('./compileCSS.cjs.js');

function resolveStaticStyleRules(styles, result = {}) {
  if (typeof styles === 'string') {
    const cssRules = compileCSS.compileCSSRules(styles);

    for (const rule of cssRules) {
      addResolvedStyles(rule, result);
    }
  } else {
    // eslint-disable-next-line guard-for-in
    for (const property in styles) {
      const value = styles[property];
      const staticCSS = compileStaticCSS.compileStaticCSS(property, value);
      addResolvedStyles(staticCSS, result);
    }
  }

  return result;
}

function addResolvedStyles(cssRule, result = {}) {
  // 👇 static rules should be inserted into default bucket
  result.d = result.d || [];
  result.d.push(cssRule);
}

exports.resolveStaticStyleRules = resolveStaticStyleRules;
//# sourceMappingURL=resolveStaticStyleRules.cjs.js.map
