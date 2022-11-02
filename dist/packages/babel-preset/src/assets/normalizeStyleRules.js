"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeStyleRules = exports.normalizeStyleRule = exports.normalizeAssetPath = void 0;
const stylis_1 = require("stylis");
const isAssetUrl_1 = require("./isAssetUrl");
/**
 * Linaria v3 emits relative paths for assets, we normalize these paths to be relative from the project root to be the
 * same if an assets was used in different files.
 */
function normalizeAssetPath(path, projectRoot, filename, asset) {
    const absoluteAssetPath = path.resolve(path.dirname(filename), asset);
    // Normalize paths to be POSIX-like to be independent of an execution environment
    return path.relative(projectRoot, absoluteAssetPath).split(path.sep).join(path.posix.sep);
}
exports.normalizeAssetPath = normalizeAssetPath;
function normalizeStyleRule(path, projectRoot, filename, ruleValue) {
    if (typeof ruleValue === 'number' || ruleValue.indexOf('url(') === -1) {
        return ruleValue;
    }
    return (0, stylis_1.tokenize)(ruleValue).reduce((result, token, index, array) => {
        if (token === 'url') {
            // Quotes in URL are optional, so we can also normalize them
            // https://www.w3.org/TR/CSS2/syndata.html#value-def-uri
            const url = array[index + 1].replace(/['|"](.+)['|"]/, '$1').slice(1, -1);
            if ((0, isAssetUrl_1.isAssetUrl)(url)) {
                array[index + 1] = `(${normalizeAssetPath(path, projectRoot, filename, url)})`;
            }
            else {
                // Always replace with normalized value, so @griffel/core can de-duplicate them.
                array[index + 1] = `(${url})`;
            }
        }
        return result + token;
    }, '');
}
exports.normalizeStyleRule = normalizeStyleRule;
function normalizeStyleRules(path, projectRoot, filename, stylesBySlots) {
    return Object.fromEntries(Object.entries(stylesBySlots).map(([key, value]) => {
        if (typeof value === 'undefined') {
            return [key, value];
        }
        // Fallback value
        if (Array.isArray(value)) {
            return [key, value.map(rule => normalizeStyleRule(path, projectRoot, filename, rule))];
        }
        // Nested objects
        if (typeof value === 'object') {
            return [key, normalizeStyleRules(path, projectRoot, filename, value)];
        }
        return [key, normalizeStyleRule(path, projectRoot, filename, value)];
    }));
}
exports.normalizeStyleRules = normalizeStyleRules;
//# sourceMappingURL=normalizeStyleRules.js.map