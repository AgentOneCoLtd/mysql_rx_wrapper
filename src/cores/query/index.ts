import { Connection, FieldInfo, MysqlError, PoolConnection, Query, QueryOptions } from 'mysql';
import { bindNodeCallback } from 'rxjs';

export type QueryInNodeCallbackFn<T> = (
    callback: (error?: MysqlError | null, result?: T, fieldList?: FieldInfo[]) => void,
) => Query;

export interface IQueryParam extends QueryOptions {
    connection: Connection | PoolConnection;
}
export function query<T>(param: IQueryParam) {
    const { connection, ...option } = param;

    const fn: QueryInNodeCallbackFn<T> = (callback) => connection.query(option, callback);

    return bindNodeCallback<[T, FieldInfo[] | undefined]>(fn.bind(fn) as () => typeof fn)();
}
