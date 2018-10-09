import { Pool } from 'mysql';
import { queryConnHigherOrder } from '../auto_handle_pool_connection';
/**
 * @deprecated since version 0.7
 *
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConnHigherOrder    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export declare function poolJob<T>(pool: Pool, queryConnHigherOrder: queryConnHigherOrder<T>): import("rxjs/internal/Observable").Observable<T>;
