import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query, QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';

export function getSqlStartTransactionStatement(): string {
    return 'START TRANSACTION;';
}

export interface IQueryStartTransactionParam {
    connection: Connection | PoolConnection;
}
export function queryStartTransaction(param: IQueryStartTransactionParam): Observable<QueryResult<IOkPacket>> {
    const { connection } = param;

    const sqlStartTransactionStatement = getSqlStartTransactionStatement();

    return query<IOkPacket>({
        sql: sqlStartTransactionStatement,
        connection,
    });
}
