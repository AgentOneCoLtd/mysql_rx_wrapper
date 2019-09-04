import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';
export declare function getSqlCommitTransactionStatement(): string;
export interface IQueryCommitTransactionParam {
    connection: Connection | PoolConnection;
}
export declare function queryCommitTransaction(param: IQueryCommitTransactionParam): Observable<QueryResult<IOkPacket>>;
//# sourceMappingURL=index.d.ts.map