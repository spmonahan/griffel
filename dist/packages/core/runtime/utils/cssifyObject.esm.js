import { hyphenateProperty } from './hyphenateProperty.esm.js';

function cssifyObject(style) {
  let css = ''; // eslint-disable-next-line guard-for-in

  for (const property in style) {
    const value = style[property];

    if (typeof value !== 'string' && typeof value !== 'number') {
      continue;
    }

    css += hyphenateProperty(property) + ':' + value + ';';
  }

  return css;
}

export { cssifyObject };
//# sourceMappingURL=cssifyObject.esm.js.map
