"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../cores/query");
function getSqlRollbackTransactionStatement() {
    return 'ROLLBACK;';
}
exports.getSqlRollbackTransactionStatement = getSqlRollbackTransactionStatement;
function queryRollbackTransaction(param) {
    const { connection } = param;
    const sqlRollbackTransactionStatement = getSqlRollbackTransactionStatement();
    return query_1.query({
        sql: sqlRollbackTransactionStatement,
        connection,
    });
}
exports.queryRollbackTransaction = queryRollbackTransaction;
