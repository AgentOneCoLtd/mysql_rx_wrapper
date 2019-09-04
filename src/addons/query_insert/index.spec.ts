import { getSqlInsertStatement, queryInsert } from './index';
import { Observable } from 'rxjs';
import { QueryResult } from '../../cores/query';
import { IOkPacket } from '../../cores/ok_packet';

describe('getSqlInsertStatement', () => {
    it('should return INSERT INTO `foobar` SET ?;', () => {
        const sqlInsertStatement = getSqlInsertStatement('foobar');

        expect(sqlInsertStatement).toBe('INSERT INTO `foobar` SET ?;');
    });
});

describe('queryInsert', () => {
    it('should throw error (empty value object)', () => {
        const fx = (): Observable<QueryResult<IOkPacket>> =>
            queryInsert({
                table: 'table',
                values: {},
                connection: 'conn' as any,
            });

        expect(fx).toThrowError();
    });
});
