import { Connection, PoolConnection } from 'mysql';
import { QueryResult } from '../../cores/query';
import { Observable } from 'rxjs';
export declare function getSqlSelectOnMatchStatement(table: string, matchProps: object, limit?: number, offset?: number): string;
export interface IQuerySelectOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    limit?: number;
    offset?: number;
    connection: Connection | PoolConnection;
}
export declare function querySelectOnMatch<T, U>(param: IQuerySelectOnMatchParam<T>): Observable<QueryResult<U[]>>;
//# sourceMappingURL=index.d.ts.map