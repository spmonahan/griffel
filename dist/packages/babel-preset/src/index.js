"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = exports.Module = exports.EvalCache = exports.shakerEvaluator = void 0;
const transformPlugin_1 = require("./transformPlugin");
var shaker_1 = require("@linaria/shaker");
Object.defineProperty(exports, "shakerEvaluator", { enumerable: true, get: function () { return shaker_1.default; } });
var babel_preset_1 = require("@linaria/babel-preset");
Object.defineProperty(exports, "EvalCache", { enumerable: true, get: function () { return babel_preset_1.EvalCache; } });
Object.defineProperty(exports, "Module", { enumerable: true, get: function () { return babel_preset_1.Module; } });
var schema_1 = require("./schema");
Object.defineProperty(exports, "configSchema", { enumerable: true, get: function () { return schema_1.configSchema; } });
function griffelPreset(babel, options) {
    return {
        plugins: [[transformPlugin_1.transformPlugin, options]],
    };
}
exports.default = griffelPreset;
//# sourceMappingURL=index.js.map