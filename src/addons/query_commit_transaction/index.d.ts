import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
export declare function getSqlCommitTransactionStatement(): string;
export interface IQueryCommitTransactionParam {
    connection: Connection | PoolConnection;
}
export declare function queryCommitTransaction(param: IQueryCommitTransactionParam): import("rxjs/internal/Observable").Observable<[IOkPacket, import("mysql").FieldInfo[] | undefined]>;
