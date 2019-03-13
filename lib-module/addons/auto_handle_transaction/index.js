import { of, throwError } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { queryCommitTransaction } from '../query_commit_transaction';
import { queryRollbackTransaction } from '../query_rollback_transaction';
import { queryStartTransaction } from '../query_start_transaction';
/**
 * start tracsaction; do task; commit if success; rollback if fail
 * @param   connection  connection that is used in query
 * @param   query       query to execute in transaction
 * @return              result of query
 */
export function autoHandleTransaction(connection, query) {
    return queryStartTransaction({ connection }).pipe(mergeMap(() => query), mergeMap((result) => queryCommitTransaction({ connection }).pipe(mergeMap(() => of(result)))), catchError((error) => queryRollbackTransaction({ connection }).pipe(mergeMap(() => throwError(error)))));
}
//# sourceMappingURL=index.js.map