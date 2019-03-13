"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function getConnection(pool) {
    return rxjs_1.bindNodeCallback(pool.getConnection.bind(pool))();
}
exports.getConnection = getConnection;
//# sourceMappingURL=index.js.map