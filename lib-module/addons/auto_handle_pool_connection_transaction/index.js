import { throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';
import { autoHandleTransaction } from '../auto_handle_transaction';
// private use
export function getQueryResult(connection, queryConn) {
    const obseravble = autoHandleTransaction(connection, queryConn(connection));
    return obseravble.pipe(map((result) => [connection, result]), 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    catchError((error) => throwError([connection, error])));
}
/**
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConn    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export function autoHandlePoolConnectionTransaction(pool, queryConn) {
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
export const autoPoolConnTrx = autoHandlePoolConnectionTransaction;
//# sourceMappingURL=index.js.map