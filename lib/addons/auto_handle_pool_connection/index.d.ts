import { Pool, PoolConnection } from 'mysql';
import { Observable } from 'rxjs';
export declare type queryConnHigherOrder<T> = (connection: PoolConnection) => Observable<T>;
export declare function getQueryResult<T>(connection: PoolConnection, queryConn: queryConnHigherOrder<T>): Observable<[PoolConnection, T]>;
/**
 * get connection from pool and release when finish or error
 * @param   pool                    pool
 * @param   queryConn    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export declare function autoHandlePoolConnection<T>(pool: Pool, queryConn: queryConnHigherOrder<T>): Observable<T>;
//# sourceMappingURL=index.d.ts.map