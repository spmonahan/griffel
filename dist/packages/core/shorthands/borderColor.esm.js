import { generateStyles } from './generateStyles.esm.js';

/**
 * A function that implements CSS spec conformant expansion for "borderColor"
 *
 * @example
 *  borderColor('red')
 *  borderColor('red', 'blue')
 *  borderColor('red', 'blue', 'green')
 *  borderColor('red', 'blue', 'green', 'yellow')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-color
 */

function borderColor(...values) {
  return generateStyles('border', 'Color', ...values);
}

export { borderColor };
//# sourceMappingURL=borderColor.esm.js.map
