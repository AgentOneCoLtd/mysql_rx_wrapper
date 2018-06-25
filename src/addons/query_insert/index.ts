import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query } from '../../cores/query';

export function getSqlInsertStatement(table: string) {
    return `INSERT INTO ${table} SET ?;`;
}

export interface IQueryInsertParam<T> {
    table: string,
    values: T,
    connection: Connection | PoolConnection,
}
export function queryInsert<T>(param: IQueryInsertParam<T>) {
    const { table, values, connection } = param;

    const sqlInsertStatement = getSqlInsertStatement(table);

    return query<IOkPacket>({
        sql: sqlInsertStatement,
        values,
        connection,
    });
}
