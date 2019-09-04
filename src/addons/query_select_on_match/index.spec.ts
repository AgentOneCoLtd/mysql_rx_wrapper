import { getSqlSelectOnMatchStatement, querySelectOnMatch } from './index';
import { Observable } from 'rxjs';
import { QueryResult } from '../../cores/query';

describe('getSqlSelectOnMatchStatement', () => {
    it("should return SELECT * FROM `foo` WHERE `foo`.`a` = 'a' ;", () => {
        const sql = getSqlSelectOnMatchStatement('foo', { a: 'a' });

        expect(sql).toBe("SELECT * FROM `foo` WHERE `foo`.`a` = 'a' ;");
    });

    it("should return SELECT * FROM `foo` WHERE `foo`.`a` = 'a' LIMIT 2 OFFSET 0 ;", () => {
        const sql = getSqlSelectOnMatchStatement('foo', { a: 'a' }, 2, 0);

        expect(sql).toBe("SELECT * FROM `foo` WHERE `foo`.`a` = 'a' LIMIT 2 OFFSET 0 ;");
    });
});

describe('querySelectOnMatch', () => {
    it('should throw error (empty matchProps)', () => {
        const fx = (): Observable<QueryResult<unknown>> =>
            querySelectOnMatch({
                table: 'table',
                matchProps: {},
                connection: 'conn' as any,
            });

        expect(fx).toThrowError();
    });
});
