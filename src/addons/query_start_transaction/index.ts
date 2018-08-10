import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query } from '../../cores/query';

export function getSqlStartTransactionStatement() {
    return 'START TRANSACTION;';
}

export interface IQueryStartTransactionParam {
    connection: Connection | PoolConnection;
}
export function queryStartTransaction(param: IQueryStartTransactionParam) {
    const { connection } = param;

    const sqlStartTransactionStatement = getSqlStartTransactionStatement();

    return query<IOkPacket>({
        sql: sqlStartTransactionStatement,
        connection,
    });
}
