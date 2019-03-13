import { Connection, PoolConnection } from 'mysql';
import { Observable } from 'rxjs';
/**
 * start tracsaction; do task; commit if success; rollback if fail
 * @param   connection  connection that is used in query
 * @param   query       query to execute in transaction
 * @return              result of query
 */
export declare function autoHandleTransaction<T>(connection: Connection | PoolConnection, query: Observable<T>): Observable<T>;
//# sourceMappingURL=index.d.ts.map