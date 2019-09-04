import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';
export declare function getSqlInsertStatement(table: string): string;
export interface IQueryInsertParam<T> {
    table: string;
    values: T & object;
    connection: Connection | PoolConnection;
}
export declare function queryInsert<T>(param: IQueryInsertParam<T>): Observable<QueryResult<IOkPacket>>;
//# sourceMappingURL=index.d.ts.map