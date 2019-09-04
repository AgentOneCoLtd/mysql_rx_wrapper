import { Connection, PoolConnection } from 'mysql';
import { QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';
export declare function getSqlSelectAllStatement(table: string, limit?: number, offset?: number): string;
export interface IQuerySelectAllParam {
    table: string;
    limit?: number;
    offset?: number;
    connection: Connection | PoolConnection;
}
export declare function querySelectAll<T>(param: IQuerySelectAllParam): Observable<QueryResult<T[]>>;
//# sourceMappingURL=index.d.ts.map