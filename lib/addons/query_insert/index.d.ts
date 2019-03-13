import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
export declare function getSqlInsertStatement(table: string): string;
export interface IQueryInsertParam<T> {
    table: string;
    values: T & object;
    connection: Connection | PoolConnection;
}
export declare function queryInsert<T>(param: IQueryInsertParam<T>): import("rxjs").Observable<[IOkPacket, import("mysql").FieldInfo[] | undefined]>;
//# sourceMappingURL=index.d.ts.map