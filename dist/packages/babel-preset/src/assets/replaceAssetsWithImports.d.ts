import { NodePath, types as t } from '@babel/core';
/**
 * Replaces assets used in styles with imports and template literals.
 *
 * @example
 * "['.foo { background-image: url(image.png) }"
 * // to
 * import _asset from 'image.png'
 * `['.foo { background-image: url(${_asset}) }`
 */
export declare function replaceAssetsWithImports(projectRoot: string, filename: string, programPath: NodePath<t.Program>, pathToUpdate: NodePath): void;
