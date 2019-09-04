import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';
export declare function getSqlRollbackTransactionStatement(): string;
export interface IQueryRollbackTransactionParam {
    connection: Connection | PoolConnection;
}
export declare function queryRollbackTransaction(param: IQueryRollbackTransactionParam): Observable<QueryResult<IOkPacket>>;
//# sourceMappingURL=index.d.ts.map