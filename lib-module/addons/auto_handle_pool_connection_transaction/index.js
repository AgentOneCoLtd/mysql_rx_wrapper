import { throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { getConnection } from '../../cores/pool_get_connection';
import { autoHandleTransaction } from '../auto_handle_transaction';
// private use
export function getQueryResult(connection, queryConnHigherOrder) {
    const obseravble = autoHandleTransaction(connection, queryConnHigherOrder(connection));
    return obseravble.pipe(map((result) => [connection, result]), 
    // tslint:disable-next-line no-any
    catchError((error) => throwError([connection, error])));
}
/**
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConnHigherOrder    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
export function autoHandlePoolConnectionTransaction(pool, queryConnHigherOrder) {
    return getConnection(pool).pipe(mergeMap((connection) => getQueryResult(connection, queryConnHigherOrder)), map(([connection, result]) => {
        connection.release();
        return result;
    }), 
    // tslint:disable-next-line no-any
    catchError(([connection, error]) => {
        connection.release();
        return throwError(error);
    }));
}
export const autoPoolConnTrx = autoHandlePoolConnectionTransaction;
//# sourceMappingURL=index.js.map