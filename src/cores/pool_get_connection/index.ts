import { Pool, PoolConnection } from 'mysql';
import { bindNodeCallback } from 'rxjs';

export function getConnection(pool: Pool) {
    return bindNodeCallback<PoolConnection>(pool.getConnection.bind(pool) as () => typeof pool.getConnection)();
}
