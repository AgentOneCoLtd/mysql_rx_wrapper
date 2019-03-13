import { isEmptyObject } from '@ag1/empty_object';
import { escapeId } from 'mysql';
import { query } from '../../cores/query';
import { joinStrList } from '../../utils/join_str_list';
import { escapeMatchProps } from '../escape_match_props';
import { getSqlLimitClause } from '../get_sql_limit_clause';
export function getSqlUpdateOnMatchStatement(table, matchProps, limit) {
    return joinStrList([
        `UPDATE ${escapeId(table)} SET ?`,
        `WHERE ${escapeMatchProps(table, matchProps)}`,
        `${getSqlLimitClause(limit)}`,
        ';',
    ]);
}
export function queryUpdateOnMatch(param) {
    const { table, matchProps, values, limit, connection } = param;
    if (isEmptyObject(matchProps) || isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }
    const sqlUpdateStatement = getSqlUpdateOnMatchStatement(table, matchProps, limit);
    return query({
        sql: sqlUpdateStatement,
        values,
        connection,
    });
}
//# sourceMappingURL=index.js.map