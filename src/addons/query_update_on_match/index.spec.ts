import { getSqlUpdateOnMatchStatement, queryUpdateOnMatch } from './index';
import { Observable } from 'rxjs';
import { QueryResult } from '../../cores/query';
import { IOkPacket } from '../../cores/ok_packet';

describe('getSqlUpdateOnMatchStatement', () => {
    it("should return UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' ;", () => {
        const sql = getSqlUpdateOnMatchStatement('foo', { a: 'a' });

        expect(sql).toBe("UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' ;");
    });

    it("should return UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' LIMIT 2 ;", () => {
        const sql = getSqlUpdateOnMatchStatement('foo', { a: 'a' }, 2);

        expect(sql).toBe("UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' LIMIT 2 ;");
    });
});

describe('queryUpdateOnMatch', () => {
    it('should throw error (empty matchProps)', () => {
        const fx = (): Observable<QueryResult<IOkPacket>> =>
            queryUpdateOnMatch({
                table: 'table',
                matchProps: {},
                values: { a: 'a' },
                connection: 'conn' as any,
            });

        expect(fx).toThrowError();
    });

    it('should throw error (empty values)', () => {
        const fx = (): Observable<QueryResult<IOkPacket>> =>
            queryUpdateOnMatch({
                table: 'table',
                matchProps: { a: 'a' },
                values: {},
                connection: 'conn' as any,
            });

        expect(fx).toThrowError();
    });
});
