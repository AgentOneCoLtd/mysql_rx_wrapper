"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function end(connection) {
    return rxjs_1.bindNodeCallback(connection.end.bind(connection))();
}
exports.end = end;
//# sourceMappingURL=index.js.map