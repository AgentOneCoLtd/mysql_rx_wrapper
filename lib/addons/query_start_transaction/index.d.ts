import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';
export declare function getSqlStartTransactionStatement(): string;
export interface IQueryStartTransactionParam {
    connection: Connection | PoolConnection;
}
export declare function queryStartTransaction(param: IQueryStartTransactionParam): Observable<QueryResult<IOkPacket>>;
//# sourceMappingURL=index.d.ts.map