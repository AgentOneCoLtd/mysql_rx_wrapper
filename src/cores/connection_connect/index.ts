import { Connection } from 'mysql';
import { bindNodeCallback, Observable } from 'rxjs';
import { IOkPacket } from '../ok_packet';

export function connect(connection: Connection): Observable<IOkPacket> {
    return bindNodeCallback<IOkPacket>(connection.connect.bind(connection) as () => typeof connection.connect)();
}
