"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configSchema = void 0;
exports.configSchema = {
    $schema: 'http://json-schema.org/schema',
    $id: 'babel-transformPlugin-options',
    type: 'object',
    properties: {
        modules: {
            type: 'array',
            items: {
                type: 'object',
                required: ['moduleSource', 'importName'],
                properties: {
                    moduleSource: {
                        type: 'string',
                    },
                    importName: {
                        type: 'string',
                    },
                },
            },
        },
        babelOptions: {
            type: 'object',
            properties: {
                plugins: {
                    type: 'array',
                },
                presets: {
                    type: 'array',
                },
            },
        },
        evaluationRules: {
            type: 'array',
            items: {
                type: 'object',
                required: ['action'],
                properties: {
                    action: {
                        anyOf: [{}, { type: 'string' }, { const: 'ignore' }],
                    },
                    test: {},
                },
            },
        },
        projectRoot: {
            type: 'string',
        },
    },
    additionalProperties: false,
};
//# sourceMappingURL=schema.js.map