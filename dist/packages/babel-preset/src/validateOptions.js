"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOptions = void 0;
const ajv_1 = require("ajv");
const schema_1 = require("./schema");
const ajv = new ajv_1.default();
/**
 * Validates options for transformPlugin with a schema.
 */
function validateOptions(pluginOptions) {
    const valid = ajv.validate(schema_1.configSchema, pluginOptions);
    if (!valid) {
        throw new Error(`Validation failed for passed config: ${ajv.errorsText(ajv.errors)}`);
    }
}
exports.validateOptions = validateOptions;
//# sourceMappingURL=validateOptions.js.map