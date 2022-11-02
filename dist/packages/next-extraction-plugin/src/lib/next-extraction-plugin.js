"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withGriffelCSSExtraction = void 0;
const tslib_1 = require("tslib");
const webpack_extraction_plugin_1 = require("@griffel/webpack-extraction-plugin");
const browserslist = require("browserslist");
const css_1 = require("next/dist/build/webpack/config/blocks/css");
const loaders_1 = require("next/dist/build/webpack/config/blocks/css/loaders");
function getSupportedBrowsers(dir, isDevelopment) {
    let browsers;
    try {
        browsers = browserslist.loadConfig({
            path: dir,
            env: isDevelopment ? 'development' : 'production',
        });
    }
    catch (_a) {
        // Prevent error on build time
    }
    return browsers;
}
const withGriffelCSSExtraction = (_a = {}) => {
    var { extractLoaderRuleAttrs: webpackLoaderRules = {} } = _a, webpackPluginOptions = (0, tslib_1.__rest)(_a, ["extractLoaderRuleAttrs"]);
    return (nextConfig = {}) => Object.assign({}, nextConfig, {
        webpack(config, options) {
            var _a, _b, _c, _d, _e;
            const { dir, dev, isServer } = options;
            if (!options.defaultLoaders) {
                throw new Error('This plugin is not compatible with Next.js versions below 5.0.0 https://err.sh/next-plugins/upgrade');
            }
            // The @Griffel compiler must run on source code, which means it must be
            // configured as the last loader in webpack so that it runs before any
            // other transformation.
            if (typeof nextConfig.webpack === 'function') {
                // eslint-disable-next-line no-param-reassign
                config = nextConfig.webpack(config, options);
            }
            if (dev) {
                // not push @griffel/webpack-extraction-plugin if dev build
                return config;
            }
            const cssRules = (_c = (_b = (_a = config.module) === null || _a === void 0 ? void 0 : _a.rules) === null || _b === void 0 ? void 0 : _b.find(rule => typeof rule === 'object' &&
                Array.isArray(rule.oneOf) &&
                rule.oneOf.some(({ test }) => test instanceof RegExp && typeof test.test === 'function' && test.test('filename.css')))) === null || _c === void 0 ? void 0 : _c.oneOf;
            if (cssRules) {
                (_e = (_d = config === null || config === void 0 ? void 0 : config.module) === null || _d === void 0 ? void 0 : _d.rules) === null || _e === void 0 ? void 0 : _e.unshift(Object.assign(Object.assign({}, webpackLoaderRules), { test: /\.(tsx|ts|js|jsx)$/, use: [
                        {
                            loader: webpack_extraction_plugin_1.GriffelCSSExtractionPlugin.loader,
                        },
                    ] }));
                cssRules.unshift({
                    test: /griffel\.css$/i,
                    sideEffects: true,
                    use: (0, loaders_1.getGlobalCssLoader)({
                        assetPrefix: config.assetPrefix,
                        isClient: !isServer,
                        isServer,
                        isDevelopment: dev,
                        future: nextConfig.future || {},
                        experimental: nextConfig.experimental || {},
                    }, () => (0, css_1.lazyPostCSS)(dir, getSupportedBrowsers(dir, dev), undefined), []),
                });
                if (!Array.isArray(config === null || config === void 0 ? void 0 : config.plugins)) {
                    config.plugins = [];
                }
                config.plugins.push(new webpack_extraction_plugin_1.GriffelCSSExtractionPlugin(webpackPluginOptions));
            }
            return config;
        },
    });
};
exports.withGriffelCSSExtraction = withGriffelCSSExtraction;
//# sourceMappingURL=next-extraction-plugin.js.map