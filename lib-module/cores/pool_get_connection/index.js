import { bindNodeCallback } from 'rxjs';
export function getConnection(pool) {
    return bindNodeCallback(pool.getConnection.bind(pool))();
}
//# sourceMappingURL=index.js.map