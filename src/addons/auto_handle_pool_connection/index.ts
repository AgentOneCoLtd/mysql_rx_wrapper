import { Pool, PoolConnection } from 'mysql';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';

// private use
export type queryConnHigherOrder<T> = (connection: PoolConnection) => Observable<T>;

// private use
export function getQueryResult<T>(connection: PoolConnection, queryConnHigherOrder: queryConnHigherOrder<T>) {
    return queryConnHigherOrder(connection).pipe(
        mergeMap((result) =>
            of([connection, result] as [PoolConnection, T])),

        catchError((error) =>
            throwError([connection, error] as [PoolConnection, any])),
    );
}

/**
 * get connection from pool and release when finish or error
 * @param   pool pool
 * @param   queryConnHigherOrder    function that take connection
 *          and return query that use the connection
 * @return                          result of query
 */
export function autoHandlePoolConnection<T>(pool: Pool, queryConnHigherOrder: queryConnHigherOrder<T>) {
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
