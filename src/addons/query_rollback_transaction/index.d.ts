import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
export declare function getSqlRollbackTransactionStatement(): string;
export interface IQueryRollbackTransactionParam {
    connection: Connection | PoolConnection;
}
export declare function queryRollbackTransaction(param: IQueryRollbackTransactionParam): import("rxjs/internal/Observable").Observable<[IOkPacket, import("mysql").FieldInfo[] | undefined]>;
