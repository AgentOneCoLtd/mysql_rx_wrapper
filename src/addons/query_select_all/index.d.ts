import { Connection, PoolConnection } from 'mysql';
export declare function getSqlSelectAllStatement(table: string, limit?: number, offset?: number): string;
export interface IQuerySelectAllParam {
    table: string;
    limit?: number;
    offset?: number;
    connection: Connection | PoolConnection;
}
export declare function querySelectAll<T>(param: IQuerySelectAllParam): import("rxjs/internal/Observable").Observable<[T[], import("mysql").FieldInfo[] | undefined]>;
