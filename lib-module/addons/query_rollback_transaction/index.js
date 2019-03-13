import { query } from '../../cores/query';
export function getSqlRollbackTransactionStatement() {
    return 'ROLLBACK;';
}
export function queryRollbackTransaction(param) {
    const { connection } = param;
    const sqlRollbackTransactionStatement = getSqlRollbackTransactionStatement();
    return query({
        sql: sqlRollbackTransactionStatement,
        connection,
    });
}
//# sourceMappingURL=index.js.map