import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
export declare function getSqlUpdateOnMatchStatement(table: string, matchProps: object, limit?: number): string;
export interface IQueryUpdateOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    values: T & object;
    limit?: number;
    connection: Connection | PoolConnection;
}
export declare function queryUpdateOnMatch<T>(param: IQueryUpdateOnMatchParam<T>): import("rxjs").Observable<[IOkPacket, import("mysql").FieldInfo[] | undefined]>;
//# sourceMappingURL=index.d.ts.map