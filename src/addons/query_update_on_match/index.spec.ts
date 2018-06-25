import { escapeMatchProps, getSqlUpdateOnMatchStatement, queryUpdateOnMatch } from './index';

describe('escapeMatchProps', () => {
    it("should return `foo`.`a` = 'a'", () => {
        const sql = escapeMatchProps('foo', { a: 'a' });

        expect(sql)
            .toBe("`foo`.`a` = 'a'");
    });

    it("should return `foo`.`a` = 'a' AND `foo`.`b` = 'b'", () => {
        const sql = escapeMatchProps('foo', { a: 'a', b: 'b' });

        expect(sql)
            .toBe("`foo`.`a` = 'a' AND `foo`.`b` = 'b'");
    });

    it('should return `foo`.`a` = 1', () => {
        const sql = escapeMatchProps('foo', { a: 1 });

        expect(sql)
            .toBe('`foo`.`a` = 1');
    });

    it('should throw error (empty obj)', () => {
        const getlSql = () => escapeMatchProps('foo', {});

        expect(getlSql)
            .toThrowError();
    });

    it('should throw error (empty obj)', () => {
        const getlSql = () => escapeMatchProps('foo', {
            a: () => 'bar',
        });

        expect(getlSql)
            .toThrowError();
    });
});

describe('getSqlUpdateOnMatchStatement', () => {
    it("should return UPDATE foo SET ? WHERE `foo`.`a` = 'a';", () => {
        const sql = getSqlUpdateOnMatchStatement('foo', { a: 'a' });

        expect(sql)
            .toBe("UPDATE foo SET ? WHERE `foo`.`a` = 'a';");
    });
});

describe('queryUpdateOnMatch', () => {
    it('should throw error (empty matchProps)', () => {
        const fx = () => queryUpdateOnMatch({
            table: 'table',
            matchProps: {},
            values: { a: 'a' },
            connection: 'conn' as any,
        });

        expect(fx)
            .toThrowError();
    });

    it('should throw error (empty values)', () => {
        const fx = () => queryUpdateOnMatch({
            table: 'table',
            matchProps: { a: 'a' },
            values: {},
            connection: 'conn' as any,
        });

        expect(fx)
            .toThrowError();
    });
});
