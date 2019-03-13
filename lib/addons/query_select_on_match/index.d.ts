import { Connection, PoolConnection } from 'mysql';
export declare function getSqlSelectOnMatchStatement(table: string, matchProps: object, limit?: number, offset?: number): string;
export interface IQuerySelectOnMatchParam<T> {
    table: string;
    matchProps: T & object;
    limit?: number;
    offset?: number;
    connection: Connection | PoolConnection;
}
export declare function querySelectOnMatch<T, U>(param: IQuerySelectOnMatchParam<T>): import("rxjs").Observable<[U[], import("mysql").FieldInfo[] | undefined]>;
//# sourceMappingURL=index.d.ts.map