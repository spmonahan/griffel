'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function normalizeNestedProperty(nestedProperty) {
  if (nestedProperty.charAt(0) === '&') {
    return nestedProperty.slice(1);
  }

  return nestedProperty;
}

exports.normalizeNestedProperty = normalizeNestedProperty;
//# sourceMappingURL=normalizeNestedProperty.cjs.js.map
