import { Pool, PoolConnection } from 'mysql';
import { bindNodeCallback, Observable } from 'rxjs';

export function getConnection(pool: Pool): Observable<PoolConnection> {
    return bindNodeCallback<PoolConnection>(<() => typeof pool.getConnection>pool.getConnection.bind(pool))();
}
