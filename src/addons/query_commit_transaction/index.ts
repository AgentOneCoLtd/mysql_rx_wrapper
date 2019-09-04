import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query, QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';

export function getSqlCommitTransactionStatement(): string {
    return 'COMMIT;';
}

export interface IQueryCommitTransactionParam {
    connection: Connection | PoolConnection;
}
export function queryCommitTransaction(param: IQueryCommitTransactionParam): Observable<QueryResult<IOkPacket>> {
    const { connection } = param;

    const sqlCommitTransactionStatement = getSqlCommitTransactionStatement();

    return query<IOkPacket>({
        sql: sqlCommitTransactionStatement,
        connection,
    });
}
