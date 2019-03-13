"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const query_commit_transaction_1 = require("../query_commit_transaction");
const query_rollback_transaction_1 = require("../query_rollback_transaction");
const query_start_transaction_1 = require("../query_start_transaction");
/**
 * start tracsaction; do task; commit if success; rollback if fail
 * @param   connection  connection that is used in query
 * @param   query       query to execute in transaction
 * @return              result of query
 */
function autoHandleTransaction(connection, query) {
    return query_start_transaction_1.queryStartTransaction({ connection }).pipe(operators_1.mergeMap(() => query), operators_1.mergeMap((result) => query_commit_transaction_1.queryCommitTransaction({ connection }).pipe(operators_1.mergeMap(() => rxjs_1.of(result)))), operators_1.catchError((error) => query_rollback_transaction_1.queryRollbackTransaction({ connection }).pipe(operators_1.mergeMap(() => rxjs_1.throwError(error)))));
}
exports.autoHandleTransaction = autoHandleTransaction;
//# sourceMappingURL=index.js.map