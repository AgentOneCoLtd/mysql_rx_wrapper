import { Pool, PoolConnection } from 'mysql';
import { bindNodeCallback, Observable } from 'rxjs';

export function getConnection(pool: Pool): Observable<PoolConnection> {
    return bindNodeCallback<PoolConnection>(pool.getConnection.bind(pool) as () => typeof pool.getConnection)();
}
