import { Pool, PoolConnection } from 'mysql';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';

// private use
export type QueryConnHigherOrder<T> = (connection: PoolConnection) => Observable<T>;

// private use
export function getQueryResult<T>(
    connection: PoolConnection,
    queryConn: QueryConnHigherOrder<T>,
): Observable<[PoolConnection, T]> {
    return queryConn(connection).pipe(
        map((result) => [connection, result] as [PoolConnection, T]),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catchError((error) => throwError([connection, error] as [PoolConnection, any])),
    );
}

/**
 * get connection from pool and release when finish or error
 * @param   pool                    pool
 * @param   queryConn    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export function autoHandlePoolConnection<T>(pool: Pool, queryConn: QueryConnHigherOrder<T>): Observable<T> {
    return getConnection(pool).pipe(
        mergeMap((connection) => getQueryResult<T>(connection, queryConn)),

        map(([connection, result]) => {
            connection.release();

            return result;
        }),

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catchError(([connection, error]: [PoolConnection, any]) => {
            connection.release();

            return throwError(error);
        }),
    );
}
