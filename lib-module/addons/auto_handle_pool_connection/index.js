import { of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';
// private use
export function getQueryResult(connection, queryConnHigherOrder) {
    return queryConnHigherOrder(connection).pipe(mergeMap((result) => of([connection, result])), 
    // tslint:disable-next-line no-any
    catchError((error) => throwError([connection, error])));
}
/**
 * get connection from pool and release when finish or error
 * @param   pool                    pool
 * @param   queryConnHigherOrder    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export function autoHandlePoolConnection(pool, queryConnHigherOrder) {
    return getConnection(pool).pipe(mergeMap((connection) => getQueryResult(connection, queryConnHigherOrder)), mergeMap(([connection, result]) => {
        connection.release();
        return of(result);
    }), 
    // tslint:disable-next-line no-any
    catchError(([connection, error]) => {
        connection.release();
        return throwError(error);
    }));
}
//# sourceMappingURL=index.js.map