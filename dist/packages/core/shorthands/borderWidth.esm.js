import { generateStyles } from './generateStyles.esm.js';

/**
 * A function that implements CSS spec conformant expansion for "borderWidth"
 *
 * @example
 *   borderWidth('10px')
 *   borderWidth('10px', '5px')
 *   borderWidth('2px', '4px', '8px')
 *   borderWidth('1px', 0, '3px', '4px')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-width
 */

function borderWidth(...values) {
  return generateStyles('border', 'Width', ...values);
}

export { borderWidth };
//# sourceMappingURL=borderWidth.esm.js.map
