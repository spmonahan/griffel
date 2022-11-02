import { compileStaticCSS } from './compileStaticCSS.esm.js';
import { compileCSSRules } from './compileCSS.esm.js';

function resolveStaticStyleRules(styles, result = {}) {
  if (typeof styles === 'string') {
    const cssRules = compileCSSRules(styles);

    for (const rule of cssRules) {
      addResolvedStyles(rule, result);
    }
  } else {
    // eslint-disable-next-line guard-for-in
    for (const property in styles) {
      const value = styles[property];
      const staticCSS = compileStaticCSS(property, value);
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

export { resolveStaticStyleRules };
//# sourceMappingURL=resolveStaticStyleRules.esm.js.map
