import { Connection, escapeId, PoolConnection } from 'mysql';
import { query } from '../../cores/query';
import { joinStrList } from '../../utils/join_str_list';
import { getSqlLimitClause } from '../get_sql_limit_clause';

export function getSqlSelectAllStatement(table: string, limit?: number, offset?: number) {
    return joinStrList([`SELECT * FROM ${escapeId(table)}`, `${getSqlLimitClause(limit, offset)}`, ';']);
}

export interface IQuerySelectAllParam {
    table: string;
    limit?: number;
    offset?: number;
    connection: Connection | PoolConnection;
}
export function querySelectAll<T>(param: IQuerySelectAllParam) {
    const { table, limit, offset, connection } = param;

    const sqlSelectStatement = getSqlSelectAllStatement(table, limit, offset);

    return query<T[]>({
        sql: sqlSelectStatement,
        connection,
    });
}
