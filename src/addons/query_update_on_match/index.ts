import { isEmptyObject } from '@ag1/empty_object';
import { Connection, escapeId, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query } from '../../cores/query';
import { escapeMatchProps } from '../escape_match_props';

export function getSqlUpdateOnMatchStatement(table: string, matchProps: object) {
    return `UPDATE ${escapeId(table)} SET ? WHERE ${escapeMatchProps(table, matchProps)};`;
}

export interface IQueryUpdateOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    values: T & object;
    connection: Connection | PoolConnection;
}
export function queryUpdateOnMatch<T>(param: IQueryUpdateOnMatchParam<T>) {
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
