'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const isUnit = value => typeof value === 'string' && /(\d+(\w+|%))/.test(value);

const isUnitless = value => typeof value === 'number' && !Number.isNaN(value);

const isInitial = value => value === 'initial';

const isAuto = value => value === 'auto';

const isNone = value => value === 'none';

const widthReservedKeys = ['content', 'fit-content', 'max-content', 'min-content'];

const isWidth = value => widthReservedKeys.some(key => value === key) || isUnit(value);
/**
 * A function that implements CSS spec conformant expansion for "flex".
 *
 * @example
 *   flex('auto')
 *   flex(1, '2.5rem')
 *   flex(0, 0, 'auto')
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/flex
 */


function flex(...values) {
  const isOneValueSyntax = values.length === 1;
  const isTwoValueSyntax = values.length === 2;
  const isThreeValueSyntax = values.length === 3;

  if (isOneValueSyntax) {
    const [firstValue] = values;

    if (isInitial(firstValue)) {
      return {
        flexGrow: 0,
        flexShrink: 1,
        flexBasis: 'auto'
      };
    }

    if (isAuto(firstValue)) {
      return {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: 'auto'
      };
    }

    if (isNone(firstValue)) {
      return {
        flexGrow: 0,
        flexShrink: 0,
        flexBasis: 'auto'
      };
    }

    if (isUnitless(firstValue)) {
      return {
        flexGrow: firstValue,
        flexShrink: 1,
        flexBasis: 0
      };
    }

    if (isWidth(firstValue)) {
      return {
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: firstValue
      };
    }
  }

  if (isTwoValueSyntax) {
    const [firstValue, secondValue] = values;

    if (isUnitless(secondValue)) {
      return {
        flexGrow: firstValue,
        flexShrink: secondValue,
        flexBasis: 0
      };
    }

    if (isWidth(secondValue)) {
      return {
        flexGrow: firstValue,
        flexShrink: 1,
        flexBasis: secondValue
      };
    }
  }

  if (isThreeValueSyntax) {
    const [firstValue, secondValue, thirdValue] = values;

    if (isUnitless(firstValue) && isUnitless(secondValue) && (isAuto(thirdValue) || isWidth(thirdValue))) {
      return {
        flexGrow: firstValue,
        flexShrink: secondValue,
        flexBasis: thirdValue
      };
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.error(`The value passed to shorthands.flex did not match any flex property specs. The CSS styles were not generated. Please, check the flex documentation.`);
  }

  return {};
}

exports.flex = flex;
//# sourceMappingURL=flex.cjs.js.map
