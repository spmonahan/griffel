import { DATA_BUCKET_ATTR } from '../constants.esm.js';

function createIsomorphicStyleSheet(styleElement, bucketName, elementAttributes, constructableStylesheets) {
  // no CSSStyleSheet in SSR, just append rules here for server render
  const __cssRulesForSSR = [];
  elementAttributes[DATA_BUCKET_ATTR] = bucketName;

  if (styleElement) {
    for (const attrName in elementAttributes) {
      styleElement.setAttribute(attrName, elementAttributes[attrName]);
    }
  }

  let sheet;

  function insertRule(rule) {
    if (constructableStylesheets) {
      if (!sheet) {
        sheet = new CSSStyleSheet(); // @ts-expect-error

        sheet.replaceSync(rule); // @ts-expect-error

        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      } else {
        sheet.insertRule(rule, sheet.cssRules.length);
      }

      return sheet.cssRules.length;
    } else if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
      return styleElement.sheet.insertRule(rule, styleElement.sheet.cssRules.length);
    }

    return __cssRulesForSSR.push(rule);
  }

  return {
    elementAttributes,
    insertRule,
    element: styleElement,
    bucketName,

    cssRules() {
      if (constructableStylesheets) {
        return Array.from(sheet.cssRules).map(cssRule => cssRule.cssText);
      } else if (styleElement === null || styleElement === void 0 ? void 0 : styleElement.sheet) {
        return Array.from(styleElement.sheet.cssRules).map(cssRule => cssRule.cssText);
      }

      return __cssRulesForSSR;
    }

  };
}
function createIsomorphicStyleSheetFromElement(element) {
  const elementAttributes = Array.from(element.attributes).reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {});
  const stylesheet = createIsomorphicStyleSheet(element, elementAttributes[DATA_BUCKET_ATTR], elementAttributes, false);
  return stylesheet;
}

export { createIsomorphicStyleSheet, createIsomorphicStyleSheetFromElement };
//# sourceMappingURL=createIsomorphicStyleSheet.esm.js.map
