"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../cores/query");
function getSqlCommitTransactionStatement() {
    return 'COMMIT;';
}
exports.getSqlCommitTransactionStatement = getSqlCommitTransactionStatement;
function queryCommitTransaction(param) {
    const { connection } = param;
    const sqlCommitTransactionStatement = getSqlCommitTransactionStatement();
    return query_1.query({
        sql: sqlCommitTransactionStatement,
        connection,
    });
}
exports.queryCommitTransaction = queryCommitTransaction;
//# sourceMappingURL=index.js.map