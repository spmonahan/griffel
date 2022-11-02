/**
 * A function that implements expansion for "transition", it's simplified - check usage examples.
 *
 * @example
 *  transition('inherit')
 *  transition('margin-right', '4s')
 *  transition('margin-right', '4s', '1s')
 *  transition('margin-right', '4s', '1s', 'ease-in')
 *  transition([
 *    ['margin-right', '4s', '1s', 'ease-in'],
 *    ['margin-right', '4s', '1s', 'ease-in'],
 * ])
 *
 * See https://developer.mozilla.org/en-US/docs/Web/CSS/transition
 */
function transition(...values) {
  if (isTransitionGlobalInputs(values)) {
    return {
      transitionDelay: values[0],
      transitionDuration: values[0],
      transitionProperty: values[0],
      transitionTimingFunction: values[0]
    };
  }

  const transitionInputs = normalizeTransitionInputs(values);
  return transitionInputs.reduce((acc, [property, duration = '0s', delay = '0s', timingFunction = 'ease'], index) => {
    if (index === 0) {
      acc.transitionProperty = property;
      acc.transitionDuration = duration;
      acc.transitionDelay = delay;
      acc.transitionTimingFunction = timingFunction;
    } else {
      acc.transitionProperty += `, ${property}`;
      acc.transitionDuration += `, ${duration}`;
      acc.transitionDelay += `, ${delay}`;
      acc.transitionTimingFunction += `, ${timingFunction}`;
    }

    return acc;
  }, {});
}
const transitionGlobalInputs = ['-moz-initial', 'inherit', 'initial', 'revert', 'unset'];

function isTransitionGlobalInputs(values) {
  return values.length === 1 && transitionGlobalInputs.includes(values[0]);
}

function normalizeTransitionInputs(transitionInputs) {
  if (transitionInputs.length === 1 && Array.isArray(transitionInputs[0])) {
    return transitionInputs[0];
  }

  return [transitionInputs];
}

export { transition };
//# sourceMappingURL=transition.esm.js.map
