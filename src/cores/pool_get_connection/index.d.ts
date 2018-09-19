import { Pool, PoolConnection } from 'mysql';
export declare function getConnection(pool: Pool): import("rxjs/internal/Observable").Observable<PoolConnection>;
