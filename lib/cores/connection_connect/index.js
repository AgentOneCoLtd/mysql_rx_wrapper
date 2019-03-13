"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
function connect(connection) {
    return rxjs_1.bindNodeCallback(connection.connect.bind(connection))();
}
exports.connect = connect;
//# sourceMappingURL=index.js.map