"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.print = void 0;
const core_1 = require("@griffel/core");
function print(val) {
    /**
     * test function makes sure that value is the guarded type
     */
    const _val = val;
    const regexParts = [];
    const regex = lookupRegex();
    if (!regex) {
        return _val;
    }
    let result = null;
    while ((result = regex.exec(_val))) {
        const [name] = result;
        const [definitions] = core_1.DEFINITION_LOOKUP_TABLE[name];
        /**
         * Collects all classNames present in a definition and adds it as part of a regular expression
         * @example
         * rules = ["f16th3vw", "frdkuqy0", "fat0sn40", "fjseox00"]
         */
        const rules = Object.keys(definitions).map(key => {
            const classes = definitions[key];
            return Array.isArray(classes) ? classes.join('|') : classes;
        });
        regexParts.push(name, ...rules);
    }
    /**
     * form parts of regular expression and removes collected classNames from string
     * @example
     * regex = /r?(f16th3vw|frdkuqy0|fat0sn40|fjseox00)/
     */
    const valStrippedClassNames = _val.replace(new RegExp(regexParts.join('|'), 'g'), '').trim();
    /**
     * Trim whitespace from className
     */
    return `"${valStrippedClassNames.replace(/className="\s*(\w*)\s*"/, 'className="$1"')}"`;
}
exports.print = print;
function test(val) {
    var _a, _b;
    if (typeof val === 'string') {
        return (_b = (_a = lookupRegex()) === null || _a === void 0 ? void 0 : _a.test(val)) !== null && _b !== void 0 ? _b : false;
    }
    return false;
}
exports.test = test;
/**
 * lookupRegex returns all classNames definitions hat were generated by Griffel
 * in a single regex declaration
 *
 * @example
 * const useStyles = makeStyles({display: { display: 'none' } });
 *
 * lookupRegex() // /(__1qdh4ig)/g
 */
function lookupRegex() {
    const definitionKeys = Object.keys(core_1.DEFINITION_LOOKUP_TABLE);
    if (definitionKeys.length) {
        return new RegExp(`${definitionKeys.join('|')}`, 'g');
    }
    return undefined;
}
//# sourceMappingURL=index.js.map