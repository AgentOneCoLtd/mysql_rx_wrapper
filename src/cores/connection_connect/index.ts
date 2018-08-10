import { Connection } from 'mysql';
import { bindNodeCallback } from 'rxjs';
import { IOkPacket } from '../ok_packet';

export function connect(connection: Connection) {
    return bindNodeCallback<IOkPacket>(connection.connect.bind(connection) as () => typeof connection.connect)();
}
