import { query } from '../../cores/query';
export function getSqlStartTransactionStatement() {
    return 'START TRANSACTION;';
}
export function queryStartTransaction(param) {
    const { connection } = param;
    const sqlStartTransactionStatement = getSqlStartTransactionStatement();
    return query({
        sql: sqlStartTransactionStatement,
        connection,
    });
}
//# sourceMappingURL=index.js.map