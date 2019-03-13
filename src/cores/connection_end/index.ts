import { Connection } from 'mysql';
import { bindNodeCallback, Observable } from 'rxjs';

export function end(connection: Connection): Observable<undefined> {
    return bindNodeCallback<undefined>(<() => typeof connection.end>connection.end.bind(connection))();
}
