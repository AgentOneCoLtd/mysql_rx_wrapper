import { Pool, PoolConnection } from 'mysql';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';
import { queryConnHigherOrder } from '../auto_handle_pool_connection';
import { autoHandleTransaction } from '../auto_handle_transaction';

// private use
export function getQueryResult<T>(
    connection: PoolConnection,
    queryConnHigherOrder: queryConnHigherOrder<T>,
): Observable<[PoolConnection, T]> {
    const obseravble = autoHandleTransaction(connection, queryConnHigherOrder(connection));

    return obseravble.pipe(
        map((result) => <[PoolConnection, T]>[connection, result]),

        // tslint:disable-next-line no-any
        catchError((error) => throwError(<[PoolConnection, any]>[connection, error])),
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
export function autoHandlePoolConnectionTransaction<T>(
    pool: Pool,
    queryConnHigherOrder: queryConnHigherOrder<T>,
): Observable<T> {
    return getConnection(pool).pipe(
        mergeMap((connection) => getQueryResult<T>(connection, queryConnHigherOrder)),

        map(([connection, result]) => {
            connection.release();

            return result;
        }),

        // tslint:disable-next-line no-any
        catchError(([connection, error]: [PoolConnection, any]) => {
            connection.release();

            return throwError(error);
        }),
    );
}

export const autoPoolConnTrx = autoHandlePoolConnectionTransaction;
