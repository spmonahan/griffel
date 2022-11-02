import { borderWidth } from './borderWidth.esm.js';
import { borderStyle } from './borderStyle.esm.js';
import { borderColor } from './borderColor.esm.js';

/**
 * A function that implements expansion for "border" to all sides of an element, it's simplified - check usage examples.
 *
 * @example
 *  border('2px')
 *  border('2px', 'solid')
 *  border('2px', 'solid', 'red')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border
 */

function border(...values) {
  return Object.assign(Object.assign(Object.assign({}, borderWidth(values[0])), values[1] && borderStyle(values[1])), values[2] && borderColor(values[2]));
}

export { border };
//# sourceMappingURL=border.esm.js.map
