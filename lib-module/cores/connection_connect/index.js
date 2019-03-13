import { bindNodeCallback } from 'rxjs';
export function connect(connection) {
    return bindNodeCallback(connection.connect.bind(connection))();
}
//# sourceMappingURL=index.js.map