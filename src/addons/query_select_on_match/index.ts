import { isEmptyObject } from '@ag1/empty_object';
import { Connection, escapeId, PoolConnection } from 'mysql';
import { query } from '../../cores/query';
import { joinStrList } from '../../utils/join_str_list';
import { escapeMatchProps } from '../escape_match_props';
import { getSqlLimitClause } from '../get_sql_limit_clause';

export function getSqlSelectOnMatchStatement(table: string, matchProps: object, limit?: number, offset?: number) {
    return joinStrList([
        `SELECT * FROM ${escapeId(table)}`,
        `WHERE ${escapeMatchProps(table, matchProps)}`,
        `${getSqlLimitClause(limit, offset)}`,
        ';',
    ]);
}

export interface IQuerySelectOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    limit?: number;
    offset?: number;
    connection: Connection | PoolConnection;
}
export function querySelectOnMatch<T, U>(param: IQuerySelectOnMatchParam<T>) {
    const { table, matchProps, limit, offset, connection } = param;

    if (isEmptyObject(matchProps)) {
        throw new Error('NO_EMPTY_OBJECT');
    }

    const sqlSelectStatement = getSqlSelectOnMatchStatement(table, matchProps, limit, offset);

    return query<U[]>({
        sql: sqlSelectStatement,
        connection,
    });
}
