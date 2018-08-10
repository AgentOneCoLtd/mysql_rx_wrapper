import { isEmptyObject } from '@ag1/empty_object';
import { Connection, escapeId, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query } from '../../cores/query';
import { joinStrList } from '../../utils/join_str_list';
import { escapeMatchProps } from '../escape_match_props';
import { getSqlLimitClause } from '../get_sql_limit_clause';

export function getSqlUpdateOnMatchStatement(table: string, matchProps: object, limit?: number) {
    return joinStrList([
        `UPDATE ${escapeId(table)} SET ?`,
        `WHERE ${escapeMatchProps(table, matchProps)}`,
        `${getSqlLimitClause(limit)}`,
        ';',
    ]);
}

export interface IQueryUpdateOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    values: T & object;
    limit?: number;
    connection: Connection | PoolConnection;
}
export function queryUpdateOnMatch<T>(param: IQueryUpdateOnMatchParam<T>) {
    const { table, matchProps, values, limit, connection } = param;

    if (isEmptyObject(matchProps) || isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }

    const sqlUpdateStatement = getSqlUpdateOnMatchStatement(table, matchProps, limit);

    return query<IOkPacket>({
        sql: sqlUpdateStatement,
        values,
        connection,
    });
}
