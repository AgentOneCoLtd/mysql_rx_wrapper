import { Connection } from 'mysql';
import { bindNodeCallback } from 'rxjs';
import { IOkPacket } from '../ok_packet';

export function end(connection: Connection) {
    return bindNodeCallback<IOkPacket>(connection.end.bind(connection))();
}
