import { throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';
// private use
export function getQueryResult(connection, queryConn) {
    return queryConn(connection).pipe(map((result) => [connection, result]), 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catchError((error) => throwError([connection, error])));
}
/**
 * get connection from pool and release when finish or error
 * @param   pool                    pool
 * @param   queryConn    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export function autoHandlePoolConnection(pool, queryConn) {
    return getConnection(pool).pipe(mergeMap((connection) => getQueryResult(connection, queryConn)), map(([connection, result]) => {
        connection.release();
        return result;
    }), 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catchError(([connection, error]) => {
        connection.release();
        return throwError(error);
    }));
}
//# sourceMappingURL=index.js.map