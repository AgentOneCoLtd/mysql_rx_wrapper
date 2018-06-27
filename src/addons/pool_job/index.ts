import { Pool, PoolConnection } from 'mysql';
import { of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';
import { queryConnHigherOrder } from '../auto_handle_pool_connection';
import { autoHandleTransaction } from '../auto_handle_transaction';

// private use
export function getQueryResult<T>(connection: PoolConnection, queryConnHigherOrder: queryConnHigherOrder<T>) {
    const obseravble = autoHandleTransaction(connection, queryConnHigherOrder(connection));

    return obseravble.pipe(
        mergeMap((result) =>
            of([connection, result] as [PoolConnection, T])),

        catchError((error) =>
            throwError([connection, error] as [PoolConnection, any])),
    );
}

/**
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConnHigherOrder    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export function poolJob<T>(pool: Pool, queryConnHigherOrder: queryConnHigherOrder<T>) {
    return getConnection(pool).pipe(
        mergeMap((connection) =>
            getQueryResult<T>(connection, queryConnHigherOrder)),

        mergeMap(([connection, result]) => {
            connection.release();

            return of(result);
        }),

        catchError(([connection, error]) => {
            connection.release();

            return throwError(error);
        }),
    );
}
