import { escapeId } from 'mysql';
import { query } from '../../cores/query';
import { joinStrList } from '../../utils/join_str_list';
import { getSqlLimitClause } from '../get_sql_limit_clause';
export function getSqlSelectAllStatement(table, limit, offset) {
    return joinStrList([`SELECT * FROM ${escapeId(table)}`, `${getSqlLimitClause(limit, offset)}`, ';']);
}
export function querySelectAll(param) {
    const { table, limit, offset, connection } = param;
    const sqlSelectStatement = getSqlSelectAllStatement(table, limit, offset);
    return query({
        sql: sqlSelectStatement,
        connection,
    });
}
//# sourceMappingURL=index.js.map