"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const pool_get_connection_1 = require("../../cores/pool_get_connection");
// private use
function getQueryResult(connection, queryConn) {
    return queryConn(connection).pipe(operators_1.map((result) => [connection, result]), 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operators_1.catchError((error) => rxjs_1.throwError([connection, error])));
}
exports.getQueryResult = getQueryResult;
/**
 * get connection from pool and release when finish or error
 * @param   pool                    pool
 * @param   queryConn    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
function autoHandlePoolConnection(pool, queryConn) {
    return pool_get_connection_1.getConnection(pool).pipe(operators_1.mergeMap((connection) => getQueryResult(connection, queryConn)), operators_1.map(([connection, result]) => {
        connection.release();
        return result;
    }), 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operators_1.catchError(([connection, error]) => {
        connection.release();
        return rxjs_1.throwError(error);
    }));
}
exports.autoHandlePoolConnection = autoHandlePoolConnection;
//# sourceMappingURL=index.js.map