import { query } from '../../cores/query';
export function getSqlCommitTransactionStatement() {
    return 'COMMIT;';
}
export function queryCommitTransaction(param) {
    const { connection } = param;
    const sqlCommitTransactionStatement = getSqlCommitTransactionStatement();
    return query({
        sql: sqlCommitTransactionStatement,
        connection,
    });
}
//# sourceMappingURL=index.js.map