import { getSqlSelectOnMatchStatement, querySelectOnMatch } from './index';

describe('getSqlSelectOnMatchStatement', () => {
    it("should return SELECT * FROM `foo` WHERE `foo`.`a` = 'a';", () => {
        const sql = getSqlSelectOnMatchStatement('foo', { a: 'a' });

        expect(sql).toBe("SELECT * FROM `foo` WHERE `foo`.`a` = 'a';");
    });
});

describe('querySelectOnMatch', () => {
    it('should throw error (empty matchProps)', () => {
        const fx = () =>
            querySelectOnMatch({
                table: 'table',
                matchProps: {},
                connection: 'conn' as any,
            });

        expect(fx).toThrowError();
    });
});
