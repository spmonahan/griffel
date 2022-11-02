"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webpackLoader = exports.shouldTransformSourceCode = void 0;
const babel_preset_1 = require("@griffel/babel-preset");
const enhancedResolve = require("enhanced-resolve");
const loader_utils_1 = require("loader-utils");
const path = require("path");
const schema_utils_1 = require("schema-utils");
const transformSync_1 = require("./transformSync");
function shouldTransformSourceCode(sourceCode, modules) {
    // Fallback to "makeStyles" if options were not provided
    const imports = modules
        ? modules.flatMap(module => [module.importName, module.resetImportName || 'makeResetStyles']).join('|')
        : 'makeStyles|makeResetStyles';
    return new RegExp(`\\b(${imports}|makeResetStyles)`).test(sourceCode);
}
exports.shouldTransformSourceCode = shouldTransformSourceCode;
/**
 * Webpack can also pass sourcemaps as a string, Babel accepts only objects.
 * See https://github.com/babel/babel-loader/pull/889.
 */
function parseSourceMap(inputSourceMap) {
    try {
        if (typeof inputSourceMap === 'string') {
            return JSON.parse(inputSourceMap);
        }
        return inputSourceMap;
    }
    catch (err) {
        return undefined;
    }
}
function webpackLoader(sourceCode, inputSourceMap) {
    var _a;
    // Loaders are cacheable by default, but in there edge cases/bugs when caching does not work until it's specified:
    // https://github.com/webpack/webpack/issues/14946
    this.cacheable();
    const options = (0, loader_utils_1.getOptions)(this);
    (0, schema_utils_1.validate)(babel_preset_1.configSchema, options, {
        name: '@griffel/webpack-loader',
        baseDataPath: 'options',
    });
    // Early return to handle cases when makeStyles() calls are not present, allows to avoid expensive invocation of Babel
    if (!shouldTransformSourceCode(sourceCode, options.modules)) {
        this.callback(null, sourceCode, inputSourceMap);
        return;
    }
    babel_preset_1.EvalCache.clearForFile(this.resourcePath);
    const resolveOptionsDefaults = {
        conditionNames: ['require'],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    };
    // ⚠ "this._compilation" limits loaders compatibility, however there seems to be no other way to access Webpack's
    // resolver.
    // There is this.resolve(), but it's asynchronous. Another option is to read the webpack.config.js, but it won't work
    // for programmatic usage. This API is used by many loaders/plugins, so hope we're safe for a while
    const resolveOptionsFromWebpackConfig = ((_a = this._compilation) === null || _a === void 0 ? void 0 : _a.options.resolve) || {};
    const resolveSync = enhancedResolve.create.sync(Object.assign(Object.assign({}, resolveOptionsDefaults), { alias: resolveOptionsFromWebpackConfig.alias, modules: resolveOptionsFromWebpackConfig.modules, plugins: resolveOptionsFromWebpackConfig.plugins }));
    const originalResolveFilename = babel_preset_1.Module._resolveFilename;
    let result = null;
    let error = null;
    try {
        // We are evaluating modules in Babel plugin to resolve expressions (function calls, imported constants, etc.) in
        // makeStyles() calls, see evaluatePathsInVM.ts.
        // Webpack's config can define own module resolution, Babel plugin should use Webpack's resolution to properly
        // resolve paths.
        babel_preset_1.Module._resolveFilename = (id, { filename }) => {
            const resolvedPath = resolveSync(path.dirname(filename), id);
            if (!resolvedPath) {
                throw new Error(`enhanced-resolve: Failed to resolve module "${id}"`);
            }
            this.addDependency(resolvedPath);
            return resolvedPath;
        };
        result = (0, transformSync_1.transformSync)(sourceCode, {
            filename: path.relative(process.cwd(), this.resourcePath),
            enableSourceMaps: this.sourceMap || false,
            inputSourceMap: parseSourceMap(inputSourceMap),
            pluginOptions: options,
        });
    }
    catch (err) {
        error = err;
    }
    finally {
        // Restore original behaviour
        babel_preset_1.Module._resolveFilename = originalResolveFilename;
    }
    if (result) {
        this.callback(null, result.code, result.sourceMap);
        return;
    }
    this.callback(error);
}
exports.webpackLoader = webpackLoader;
//# sourceMappingURL=webpackLoader.js.map