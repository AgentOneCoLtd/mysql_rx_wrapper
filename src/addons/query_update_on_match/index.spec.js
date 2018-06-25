"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('getSqlWhereClause', () => {
    it("should return `foo`.`a` = 'a'", () => {
        const sql = index_1.getSqlWhereClause('foo', { a: 'a' });
        expect(sql)
            .toBe("`foo`.`a` = 'a'");
    });
    it("should return `foo`.`a` = 'a' AND `foo`.`b` = 'b'", () => {
        const sql = index_1.getSqlWhereClause('foo', { a: 'a', b: 'b' });
        expect(sql)
            .toBe("`foo`.`a` = 'a' AND `foo`.`b` = 'b'");
    });
    it('should return `foo`.`a` = 1', () => {
        const sql = index_1.getSqlWhereClause('foo', { a: 1 });
        expect(sql)
            .toBe('`foo`.`a` = 1');
    });
    it('should throw error (empty obj)', () => {
        const getlSql = () => index_1.getSqlWhereClause('foo', {});
        expect(getlSql)
            .toThrowError();
    });
    it('should throw error (empty obj)', () => {
        const getlSql = () => index_1.getSqlWhereClause('foo', {
            a: () => 'bar',
        });
        expect(getlSql)
            .toThrowError();
    });
});
describe('getSqlUpdateOnMatchStatement', () => {
    it("should return UPDATE foo SET ? WHERE `foo`.`a` = 'a';", () => {
        const sql = index_1.getSqlUpdateOnMatchStatement('foo', { a: 'a' });
        expect(sql)
            .toBe("UPDATE foo SET ? WHERE `foo`.`a` = 'a';");
    });
});
describe('queryUpdateOnMatch', () => {
    it('should throw error (empty matchProps)', () => {
        const fx = () => index_1.queryUpdateOnMatch({
            table: 'table',
            matchProps: {},
            values: { a: 'a' },
            connection: 'conn',
        });
        expect(fx)
            .toThrowError();
    });
    it('should throw error (empty values)', () => {
        const fx = () => index_1.queryUpdateOnMatch({
            table: 'table',
            matchProps: { a: 'a' },
            values: {},
            connection: 'conn',
        });
        expect(fx)
            .toThrowError();
    });
});
