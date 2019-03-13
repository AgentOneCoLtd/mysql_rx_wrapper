import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
export declare function getSqlStartTransactionStatement(): string;
export interface IQueryStartTransactionParam {
    connection: Connection | PoolConnection;
}
export declare function queryStartTransaction(param: IQueryStartTransactionParam): import("rxjs").Observable<[IOkPacket, import("mysql").FieldInfo[] | undefined]>;
//# sourceMappingURL=index.d.ts.map