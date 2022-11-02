'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const positionMap = ['Top', 'Right', 'Bottom', 'Left'];
function generateStyles(property, suffix, ...values) {
  const [firstValue, secondValue = firstValue, thirdValue = firstValue, fourthValue = secondValue] = values;
  const valuesWithDefaults = [firstValue, secondValue, thirdValue, fourthValue];
  const styles = {};

  for (let i = 0; i < valuesWithDefaults.length; i += 1) {
    if (valuesWithDefaults[i] || valuesWithDefaults[i] === 0) {
      const newKey = property + positionMap[i] + suffix;
      styles[newKey] = valuesWithDefaults[i];
    }
  }

  return styles;
}

exports.generateStyles = generateStyles;
//# sourceMappingURL=generateStyles.cjs.js.map
