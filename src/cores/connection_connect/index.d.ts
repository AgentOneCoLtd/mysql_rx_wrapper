import { Connection } from 'mysql';
import { IOkPacket } from '../ok_packet';
export declare function connect(connection: Connection): import("rxjs/internal/Observable").Observable<IOkPacket>;
