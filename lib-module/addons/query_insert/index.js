import { isEmptyObject } from '@ag1/empty_object';
import { escapeId } from 'mysql';
import { query } from '../../cores/query';
export function getSqlInsertStatement(table) {
    return `INSERT INTO ${escapeId(table)} SET ?;`;
}
export function queryInsert(param) {
    const { table, values, connection } = param;
    if (isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }
    const sqlInsertStatement = getSqlInsertStatement(table);
    return query({
        sql: sqlInsertStatement,
        values,
        connection,
    });
}
//# sourceMappingURL=index.js.map