"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const pool_get_connection_1 = require("../../cores/pool_get_connection");
const auto_handle_transaction_1 = require("../auto_handle_transaction");
// private use
function getQueryResult(connection, queryConnHigherOrder) {
    const obseravble = auto_handle_transaction_1.autoHandleTransaction(connection, queryConnHigherOrder(connection));
    return obseravble.pipe(operators_1.mergeMap((result) => rxjs_1.of([connection, result])), operators_1.catchError((error) => rxjs_1.throwError([connection, error])));
}
exports.getQueryResult = getQueryResult;
/**
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConnHigherOrder    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
function poolJob(pool, queryConnHigherOrder) {
    return pool_get_connection_1.getConnection(pool).pipe(operators_1.mergeMap((connection) => getQueryResult(connection, queryConnHigherOrder)), operators_1.mergeMap(([connection, result]) => {
        connection.release();
        return rxjs_1.of(result);
    }), operators_1.catchError(([connection, error]) => {
        connection.release();
        return rxjs_1.throwError(error);
    }));
}
exports.poolJob = poolJob;
