'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashString = require('@emotion/hash');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hashString__default = /*#__PURE__*/_interopDefaultLegacy(hashString);

function hashPropertyKey(selectors, media, support, property) {
  // uniq key based on property & selector, used for merging later
  const computedKey = selectors.join('') + media + support + property; // "key" can be really long as it includes selectors, we use hashes to reduce sizes of keys
  // ".foo :hover" => "abcd"

  const hashedKey = hashString__default["default"](computedKey); // As these hashes are used as object keys in build output we should avoid having numbers as a first character to
  // avoid having quotes:
  // {
  //   "1abc": {}, // we don't want this
  //   Aabc: {}, // no quotes
  // }

  const firstCharCode = hashedKey.charCodeAt(0);
  const startsWithNumber = firstCharCode >= 48 && firstCharCode <= 57;

  if (startsWithNumber) {
    return String.fromCharCode(firstCharCode + 17) + hashedKey.substr(1);
  }

  return hashedKey;
}

exports.hashPropertyKey = hashPropertyKey;
//# sourceMappingURL=hashPropertyKey.cjs.js.map
