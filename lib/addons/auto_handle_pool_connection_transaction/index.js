"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const pool_get_connection_1 = require("../../cores/pool_get_connection");
const auto_handle_transaction_1 = require("../auto_handle_transaction");
// private use
function getQueryResult(connection, queryConn) {
    const obseravble = auto_handle_transaction_1.autoHandleTransaction(connection, queryConn(connection));
    return obseravble.pipe(operators_1.map((result) => [connection, result]), 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    operators_1.catchError((error) => rxjs_1.throwError([connection, error])));
}
exports.getQueryResult = getQueryResult;
/**
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConn    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
function autoHandlePoolConnectionTransaction(pool, queryConn) {
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
exports.autoHandlePoolConnectionTransaction = autoHandlePoolConnectionTransaction;
exports.autoPoolConnTrx = autoHandlePoolConnectionTransaction;
//# sourceMappingURL=index.js.map