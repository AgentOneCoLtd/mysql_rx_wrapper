import { Pool, PoolConnection } from 'mysql';
import { Observable } from 'rxjs';
import { QueryConnHigherOrder } from '../auto_handle_pool_connection';
export declare function getQueryResult<T>(connection: PoolConnection, queryConn: QueryConnHigherOrder<T>): Observable<[PoolConnection, T]>;
/**
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConn    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export declare function autoHandlePoolConnectionTransaction<T>(pool: Pool, queryConn: QueryConnHigherOrder<T>): Observable<T>;
export declare const autoPoolConnTrx: typeof autoHandlePoolConnectionTransaction;
//# sourceMappingURL=index.d.ts.map