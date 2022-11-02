'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var stackTrace = require('./react-render-tracker/stackTrace.cjs.js');

function getSourceURLfromError() {
  const stacks = String(new Error().stack).split('\n');
  const userMakeStyleCallLine = findUserMakeStyleCallInStacks(stacks);

  if (userMakeStyleCallLine === undefined) {
    return undefined;
  }

  const result = stackTrace.parseStackTraceLine(userMakeStyleCallLine);
  return result === null || result === void 0 ? void 0 : result.loc;
}

function findUserMakeStyleCallInStacks(stacks) {
  for (let i = stacks.length - 1; i >= 0; --i) {
    if (stacks[i].includes('at getSourceURLfromError')) {
      // The error stacks look like:
      //   getSourceURLfromError
      //   makeStyles/__styles in griffel core
      //   makeStyles/__styles in griffel react
      //   user makeStyles call
      return stacks[i + 3];
    }
  }

  return undefined;
}

exports.getSourceURLfromError = getSourceURLfromError;
//# sourceMappingURL=getSourceURLfromError.cjs.js.map
