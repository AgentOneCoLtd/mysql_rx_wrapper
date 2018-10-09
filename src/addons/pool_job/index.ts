import { Pool } from 'mysql';
import { deprecate } from '../../utils/deprecate';
import { queryConnHigherOrder } from '../auto_handle_pool_connection';
import { autoPoolConnTrx } from '../auto_handle_pool_connection_transaction';

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
export function poolJob<T>(pool: Pool, queryConnHigherOrder: queryConnHigherOrder<T>) {
    deprecate('use autoPoolConnTrx or autoHandlePoolConnectionTransaction instead');

    return autoPoolConnTrx<T>(pool, queryConnHigherOrder);
}
