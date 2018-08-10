import { isEmptyObject } from '@ag1/empty_object';
import { Connection, escapeId, PoolConnection } from 'mysql';
import { query } from '../../cores/query';
import { escapeMatchProps } from '../escape_match_props';

export function getSqlSelectOnMatchStatement(table: string, matchProps: object) {
    return `SELECT * FROM ${escapeId(table)} WHERE ${escapeMatchProps(table, matchProps)};`;
}

export interface IQuerySelectOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    connection: Connection | PoolConnection;
}
export function querySelectOnMatch<T, U>(param: IQuerySelectOnMatchParam<T>) {
    const { table, matchProps, connection } = param;

    if (isEmptyObject(matchProps)) {
        throw new Error('NO_EMPTY_OBJECT');
    }

    const sqlSelectStatement = getSqlSelectOnMatchStatement(table, matchProps);

    return query<U>({
        sql: sqlSelectStatement,
        connection,
    });
}
