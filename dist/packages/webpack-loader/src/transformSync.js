"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformSync = void 0;
const Babel = require("@babel/core");
const babel_preset_1 = require("@griffel/babel-preset");
/**
 * Transforms passed source code with Babel, uses user's config for parsing, but ignores it for transforms.
 */
function transformSync(sourceCode, options) {
    // Parse the code first so Babel will use user's babel config for parsing
    // During transforms we don't want to use user's config
    const babelAST = Babel.parseSync(sourceCode, {
        caller: { name: 'griffel' },
        filename: options.filename,
        inputSourceMap: options.inputSourceMap,
        sourceMaps: options.enableSourceMaps,
    });
    if (babelAST === null) {
        throw new Error(`Failed to create AST for "${options.filename}" due unknown Babel error...`);
    }
    const babelFileResult = Babel.transformFromAstSync(babelAST, sourceCode, {
        // Ignore all user's configs and apply only our plugin
        babelrc: false,
        configFile: false,
        presets: [[babel_preset_1.default, options.pluginOptions]],
        filename: options.filename,
        sourceMaps: options.enableSourceMaps,
        sourceFileName: options.filename,
        inputSourceMap: options.inputSourceMap,
    });
    if (babelFileResult === null) {
        throw new Error(`Failed to transform "${options.filename}" due unknown Babel error...`);
    }
    return {
        code: babelFileResult.code,
        sourceMap: babelFileResult.map === null ? undefined : babelFileResult.map,
    };
}
exports.transformSync = transformSync;
//# sourceMappingURL=transformSync.js.map