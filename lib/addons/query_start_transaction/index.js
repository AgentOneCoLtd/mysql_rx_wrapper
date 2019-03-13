"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../cores/query");
function getSqlStartTransactionStatement() {
    return 'START TRANSACTION;';
}
exports.getSqlStartTransactionStatement = getSqlStartTransactionStatement;
function queryStartTransaction(param) {
    const { connection } = param;
    const sqlStartTransactionStatement = getSqlStartTransactionStatement();
    return query_1.query({
        sql: sqlStartTransactionStatement,
        connection,
    });
}
exports.queryStartTransaction = queryStartTransaction;
//# sourceMappingURL=index.js.map