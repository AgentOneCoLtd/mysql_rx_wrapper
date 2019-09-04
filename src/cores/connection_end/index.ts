import { Connection } from 'mysql';
import { bindNodeCallback, Observable } from 'rxjs';

export function end(connection: Connection): Observable<undefined> {
    return bindNodeCallback<undefined>(connection.end.bind(connection) as () => typeof connection.end)();
}
