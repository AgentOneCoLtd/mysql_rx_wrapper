import { isEmptyObject } from '@ag1/empty_object';
import { Connection, escapeId, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query, QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';

export function getSqlInsertStatement(table: string): string {
    return `INSERT INTO ${escapeId(table)} SET ?;`;
}

export interface IQueryInsertParam<T> {
    table: string;
    values: T & object;
    connection: Connection | PoolConnection;
}
export function queryInsert<T>(param: IQueryInsertParam<T>): Observable<QueryResult<IOkPacket>> {
    const { table, values, connection } = param;

    if (isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }

    const sqlInsertStatement = getSqlInsertStatement(table);

    return query<IOkPacket>({
        sql: sqlInsertStatement,
        values,
        connection,
    });
}
