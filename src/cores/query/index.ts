import { Connection, FieldInfo, MysqlError, PoolConnection, Query, QueryOptions } from 'mysql';
import { bindNodeCallback, Observable } from 'rxjs';

export type QueryInNodeCallbackFn<T> = (
    callback: (error?: MysqlError | null, result?: T, fieldList?: FieldInfo[]) => void,
) => Query;

export type QueryResult<T> = [T, FieldInfo[] | undefined];

export interface IQueryParam extends QueryOptions {
    connection: Connection | PoolConnection;
}
export function query<T>(param: IQueryParam): Observable<QueryResult<T>> {
    const { connection, ...option } = param;

    const fn: QueryInNodeCallbackFn<T> = (callback) => connection.query(option, callback);

    return bindNodeCallback<QueryResult<T>>((fn.bind(fn) as unknown) as () => typeof fn)();
}
