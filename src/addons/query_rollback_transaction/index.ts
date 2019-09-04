import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query, QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';

export function getSqlRollbackTransactionStatement(): string {
    return 'ROLLBACK;';
}

export interface IQueryRollbackTransactionParam {
    connection: Connection | PoolConnection;
}
export function queryRollbackTransaction(param: IQueryRollbackTransactionParam): Observable<QueryResult<IOkPacket>> {
    const { connection } = param;

    const sqlRollbackTransactionStatement = getSqlRollbackTransactionStatement();

    return query<IOkPacket>({
        sql: sqlRollbackTransactionStatement,
        connection,
    });
}
