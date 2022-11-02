'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var stylis = require('stylis');
var globalPlugin = require('./stylis/globalPlugin.cjs.js');
var hyphenateProperty = require('./utils/hyphenateProperty.cjs.js');
var normalizeNestedProperty = require('./utils/normalizeNestedProperty.cjs.js');

const PSEUDO_SELECTOR_REGEX = /,( *[^ &])/g;
/**
 * Normalizes pseudo selectors to always contain &, requires to work properly with comma-separated selectors.
 *
 * @example
 *   ":hover" => "&:hover"
 *   " :hover" => "& :hover"
 *   ":hover,:focus" => "&:hover,&:focus"
 *   " :hover, :focus" => "& :hover,& :focus"
 */

function normalizePseudoSelector(pseudoSelector) {
  return '&' + normalizeNestedProperty.normalizeNestedProperty( // Regex there replaces a comma, spaces and an ampersand if it's present with comma and an ampersand.
  // This allows to normalize input, see examples in JSDoc.
  pseudoSelector.replace(PSEUDO_SELECTOR_REGEX, ',&$1'));
}
function compileCSSRules(cssRules) {
  const rules = [];
  stylis.serialize(stylis.compile(cssRules), stylis.middleware([globalPlugin.globalPlugin, stylis.prefixer, stylis.stringify, // 💡 we are using `.insertRule()` API for DOM operations, which does not support
  // insertion of multiple CSS rules in a single call. `rulesheet` plugin extracts
  // individual rules to be used with this API
  stylis.rulesheet(rule => rules.push(rule))]));
  return rules;
}

function createCSSRule(classNameSelector, cssDeclaration, pseudos) {
  let cssRule = cssDeclaration;

  if (pseudos.length > 0) {
    cssRule = pseudos.reduceRight((acc, selector) => {
      return `${normalizePseudoSelector(selector)} { ${acc} }`;
    }, cssDeclaration);
  }

  return `${classNameSelector}{${cssRule}}`;
}

function compileCSS(options) {
  const {
    className,
    media,
    layer,
    selectors,
    support,
    property,
    rtlClassName,
    rtlProperty,
    rtlValue,
    value
  } = options;
  const classNameSelector = `.${className}`;
  const cssDeclaration = Array.isArray(value) ? `${value.map(v => `${hyphenateProperty.hyphenateProperty(property)}: ${v}`).join(';')};` : `${hyphenateProperty.hyphenateProperty(property)}: ${value};`;
  let cssRule = createCSSRule(classNameSelector, cssDeclaration, selectors);

  if (rtlProperty && rtlClassName) {
    const rtlClassNameSelector = `.${rtlClassName}`;
    const rtlCSSDeclaration = Array.isArray(rtlValue) ? `${rtlValue.map(v => `${hyphenateProperty.hyphenateProperty(rtlProperty)}: ${v}`).join(';')};` : `${hyphenateProperty.hyphenateProperty(rtlProperty)}: ${rtlValue};`;
    cssRule += createCSSRule(rtlClassNameSelector, rtlCSSDeclaration, selectors);
  }

  if (media) {
    cssRule = `@media ${media} { ${cssRule} }`;
  }

  if (layer) {
    cssRule = `@layer ${layer} { ${cssRule} }`;
  }

  if (support) {
    cssRule = `@supports ${support} { ${cssRule} }`;
  }

  return compileCSSRules(cssRule);
}

exports.compileCSS = compileCSS;
exports.compileCSSRules = compileCSSRules;
exports.normalizePseudoSelector = normalizePseudoSelector;
//# sourceMappingURL=compileCSS.cjs.js.map
