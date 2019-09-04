import { Connection, FieldInfo, MysqlError, PoolConnection, Query, QueryOptions } from 'mysql';
import { Observable } from 'rxjs';
export declare type QueryInNodeCallbackFn<T> = (callback: (error?: MysqlError | null, result?: T, fieldList?: FieldInfo[]) => void) => Query;
export declare type QueryResult<T> = [T, FieldInfo[] | undefined];
export interface IQueryParam extends QueryOptions {
    connection: Connection | PoolConnection;
}
export declare function query<T>(param: IQueryParam): Observable<QueryResult<T>>;
//# sourceMappingURL=index.d.ts.map