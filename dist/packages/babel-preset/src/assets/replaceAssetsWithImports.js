"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceAssetsWithImports = void 0;
const core_1 = require("@babel/core");
const path = require("path");
const stylis_1 = require("stylis");
const absolutePathToRelative_1 = require("./absolutePathToRelative");
const isAssetUrl_1 = require("./isAssetUrl");
/**
 * Replaces assets used in styles with imports and template literals.
 *
 * @example
 * "['.foo { background-image: url(image.png) }"
 * // to
 * import _asset from 'image.png'
 * `['.foo { background-image: url(${_asset}) }`
 */
function replaceAssetsWithImports(projectRoot, filename, programPath, pathToUpdate) {
    const assetIdentifiers = new Map();
    function getAssetIdentifier(assetPath) {
        if (!assetIdentifiers.has(assetPath)) {
            assetIdentifiers.set(assetPath, programPath.scope.generateUidIdentifier('asset'));
        }
        return assetIdentifiers.get(assetPath);
    }
    function buildTemplateLiteralFromValue(value) {
        const tokens = (0, stylis_1.tokenize)(value);
        const quasis = [];
        const expressions = [];
        let acc = '';
        for (let i = 0, l = tokens.length; i < l; i++) {
            acc += tokens[i];
            if (tokens[i] === 'url') {
                const url = tokens[i + 1].slice(1, -1);
                if ((0, isAssetUrl_1.isAssetUrl)(url)) {
                    // Handle `filter: url(./a.svg#id)`
                    const [pathname, hash] = url.split('#');
                    quasis.push(core_1.types.templateElement({ raw: acc + '(' }, false));
                    expressions.push(getAssetIdentifier(pathname));
                    acc = `${hash ? `#${hash}` : ''})`;
                    i++;
                }
            }
        }
        quasis.push(core_1.types.templateElement({ raw: acc }, true));
        return core_1.types.templateLiteral(quasis, expressions);
    }
    (0, core_1.traverse)(pathToUpdate.node, {
        StringLiteral(literalPath) {
            const value = literalPath.node.value;
            if (value.indexOf('url(') === -1) {
                return;
            }
            literalPath.replaceWith(buildTemplateLiteralFromValue(value));
        },
    }, programPath.scope, programPath);
    for (const [importPath, identifier] of assetIdentifiers.entries()) {
        const relativePath = (0, absolutePathToRelative_1.absolutePathToRelative)(path, projectRoot, filename, importPath);
        programPath.unshiftContainer('body', core_1.types.importDeclaration([core_1.types.importDefaultSpecifier(identifier)], core_1.types.stringLiteral(relativePath)));
    }
}
exports.replaceAssetsWithImports = replaceAssetsWithImports;
//# sourceMappingURL=replaceAssetsWithImports.js.map