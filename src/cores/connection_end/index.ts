import { Connection } from 'mysql';
import { bindNodeCallback } from 'rxjs';

export function end(connection: Connection) {
    return bindNodeCallback<undefined>(connection.end.bind(connection) as () => typeof connection.end)();
}
