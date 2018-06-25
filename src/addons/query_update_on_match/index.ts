import { isEmptyObject } from '@ag1/empty_object';
import { Connection, escape, escapeId, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query } from '../../cores/query';

export function escapeMatchProps(table: string, matchProps: object) {
    const matchPropsStr = escape(matchProps);

    if (matchPropsStr.length === 0) {
        throw new Error('MATCH_PROPS_EXPECTED');
    }

    return matchPropsStr
        .split(',')
        .map((str) => `${escapeId(table)}.${str.trim()}`)
        .map((str) => {
            const parts = str.split('\u0020');
            const L = 0;
            const R = 2;

            if (parts[R] === 'NULL') {
                return `${parts[L]} IS ${parts[R]}`;
            }

            return str;
        })
        .join('\u0020AND\u0020');
}

export function getSqlUpdateOnMatchStatement(table: string, matchProps: object) {
    return `UPDATE ${table} SET ? WHERE ${escapeMatchProps(table, matchProps)};`;
}

export interface IQueryUpdateOnMatchParam<T, U> {
    table: string,
    matchProps: T & object,
    values: U & object,
    connection: Connection | PoolConnection,
}
export function queryUpdateOnMatch<T, U>(param: IQueryUpdateOnMatchParam<T, U>) {
    const { table, matchProps, values, connection } = param;

    if (isEmptyObject(matchProps) || isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }

    const sqlUpdateStatement = getSqlUpdateOnMatchStatement(table, matchProps);

    return query<IOkPacket>({
        sql: sqlUpdateStatement,
        values,
        connection,
    });
}
