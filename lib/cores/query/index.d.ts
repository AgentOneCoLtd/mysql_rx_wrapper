import { Connection, FieldInfo, MysqlError, PoolConnection, Query, QueryOptions } from 'mysql';
export declare type QueryInNodeCallbackFn<T> = (callback: (error?: MysqlError | null, result?: T, fieldList?: FieldInfo[]) => void) => Query;
export interface IQueryParam extends QueryOptions {
    connection: Connection | PoolConnection;
}
export declare function query<T>(param: IQueryParam): import("rxjs").Observable<[T, FieldInfo[] | undefined]>;
//# sourceMappingURL=index.d.ts.map