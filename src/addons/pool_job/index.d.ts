import { Pool, PoolConnection } from 'mysql';
import { queryConnHigherOrder } from '../auto_handle_pool_connection';
export declare function getQueryResult<T>(connection: PoolConnection, queryConnHigherOrder: queryConnHigherOrder<T>): import("rxjs/internal/Observable").Observable<[PoolConnection, T]>;
/**
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConnHigherOrder    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export declare function poolJob<T>(pool: Pool, queryConnHigherOrder: queryConnHigherOrder<T>): import("rxjs/internal/Observable").Observable<T>;
