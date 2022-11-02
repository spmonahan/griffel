'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var hashString = require('@emotion/hash');
var constants = require('../../constants.cjs.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var hashString__default = /*#__PURE__*/_interopDefaultLegacy(hashString);

function padEndHash(value) {
  const hashLength = value.length;

  if (hashLength === constants.SEQUENCE_HASH_LENGTH) {
    return value;
  }

  for (let i = hashLength; i < constants.SEQUENCE_HASH_LENGTH; i++) {
    value += '0';
  }

  return value;
}

function hashSequence(classes, dir, sequenceIds = []) {
  if (process.env.NODE_ENV === 'production') {
    return constants.SEQUENCE_PREFIX + padEndHash(hashString__default["default"](classes + dir));
  }

  return constants.SEQUENCE_PREFIX + padEndHash(hashString__default["default"](classes + dir)) + constants.DEBUG_SEQUENCE_SEPARATOR + padEndHash(hashString__default["default"](sequenceIds.join('')));
}

exports.hashSequence = hashSequence;
//# sourceMappingURL=hashSequence.cjs.js.map
