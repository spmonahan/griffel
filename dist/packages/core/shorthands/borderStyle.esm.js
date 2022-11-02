import { generateStyles } from './generateStyles.esm.js';

/**
 * A function that implements CSS spec conformant expansion for "borderStyle"
 *
 * @example
 *  borderStyle('solid')
 *  borderStyle('solid', 'dashed')
 *  borderStyle('solid', 'dashed', 'dotted')
 *  borderStyle('solid', 'dashed', 'dotted', 'double')
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/border-style
 */

function borderStyle(...values) {
  return generateStyles('border', 'Style', ...values);
}

export { borderStyle };
//# sourceMappingURL=borderStyle.esm.js.map
