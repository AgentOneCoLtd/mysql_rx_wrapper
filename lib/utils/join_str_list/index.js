"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function joinStrList(strList) {
    return strList
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .join('\u0020');
}
exports.joinStrList = joinStrList;
//# sourceMappingURL=index.js.map