"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAssetUrl = void 0;
function isAssetUrl(value) {
    return (!value.startsWith('data:') &&
        !value.startsWith('http:') &&
        !value.startsWith('https:') &&
        !value.startsWith('//') /* Urls without protocol (use the same protocol as current page) */ &&
        !value.startsWith('#') /* Hash only urls like `filter: url(#id)` */);
}
exports.isAssetUrl = isAssetUrl;
//# sourceMappingURL=isAssetUrl.js.map