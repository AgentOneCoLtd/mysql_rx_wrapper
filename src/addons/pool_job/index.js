"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deprecate_1 = require("../../utils/deprecate");
const auto_handle_pool_connection_transaction_1 = require("../auto_handle_pool_connection_transaction");
/**
 * @deprecated since version 0.7
 *
 * similar to autoHandlePoolConnection but also autoHandleTransaction
 * @param   pool                    pool
 * @param   queryConnHigherOrder    function that take connection
 *                                  and return query that use the
 *                                  connection
 * @return                          result of query
 */
function poolJob(pool, queryConnHigherOrder) {
    deprecate_1.deprecate('use autoPoolConnTrx or autoHandlePoolConnectionTransaction instead');
    return auto_handle_pool_connection_transaction_1.autoPoolConnTrx(pool, queryConnHigherOrder);
}
exports.poolJob = poolJob;
