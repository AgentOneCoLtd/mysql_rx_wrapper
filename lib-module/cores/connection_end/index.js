import { bindNodeCallback } from 'rxjs';
export function end(connection) {
    return bindNodeCallback(connection.end.bind(connection))();
}
//# sourceMappingURL=index.js.map