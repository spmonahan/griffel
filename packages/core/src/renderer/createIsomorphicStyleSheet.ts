import { DATA_BUCKET_ATTR } from '../constants';
import { IsomorphicStyleSheet, StyleBucketName } from '../types';

export function createIsomorphicStyleSheet(
  styleElement: HTMLStyleElement | undefined,
  bucketName: StyleBucketName,
  elementAttributes: Record<string, string>,
  constructableStylesheets: boolean,
): IsomorphicStyleSheet {
  // no CSSStyleSheet in SSR, just append rules here for server render
  const __cssRulesForSSR: string[] = [];

  elementAttributes[DATA_BUCKET_ATTR] = bucketName;
  if (styleElement) {
    for (const attrName in elementAttributes) {
      styleElement.setAttribute(attrName, elementAttributes[attrName]);
    }
  }

  let sheet: CSSStyleSheet;
  function insertRule(rule: string) {
    if (constructableStylesheets) {
      if (!sheet) {
        sheet = new CSSStyleSheet();
        // @ts-expect-error
        sheet.replaceSync(rule);
        // @ts-expect-error
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
      } else {
        sheet.insertRule(rule, sheet.cssRules.length);
      }
      return sheet.cssRules.length;
    } else if (styleElement?.sheet) {
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
      } else if (styleElement?.sheet) {
        return Array.from(styleElement.sheet.cssRules).map(cssRule => cssRule.cssText);
      }

      return __cssRulesForSSR;
    },
  };
}

export function createIsomorphicStyleSheetFromElement(element: HTMLStyleElement) {
  const elementAttributes = Array.from(element.attributes).reduce((acc, attr) => {
    acc[attr.name] = attr.value;
    return acc;
  }, {} as Record<string, string>);
  const stylesheet = createIsomorphicStyleSheet(
    element,
    elementAttributes[DATA_BUCKET_ATTR] as StyleBucketName,
    elementAttributes,
    false,
  );
  return stylesheet;
}
