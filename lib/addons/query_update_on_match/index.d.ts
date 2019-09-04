import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';
export declare function getSqlUpdateOnMatchStatement(table: string, matchProps: object, limit?: number): string;
export interface IQueryUpdateOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    values: T & object;
    limit?: number;
    connection: Connection | PoolConnection;
}
export declare function queryUpdateOnMatch<T>(param: IQueryUpdateOnMatchParam<T>): Observable<QueryResult<IOkPacket>>;
//# sourceMappingURL=index.d.ts.map