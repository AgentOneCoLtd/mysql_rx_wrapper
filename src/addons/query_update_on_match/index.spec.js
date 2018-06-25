"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('escapeMatchProps', () => {
    it("should return `foo`.`a` = 'a'", () => {
        const sql = index_1.escapeMatchProps('foo', { a: 'a' });
        expect(sql)
            .toBe("`foo`.`a` = 'a'");
    });
    it("should return `foo`.`a` = 'a' AND `foo`.`b` = 'b'", () => {
        const sql = index_1.escapeMatchProps('foo', { a: 'a', b: 'b' });
        expect(sql)
            .toBe("`foo`.`a` = 'a' AND `foo`.`b` = 'b'");
    });
    it('should return `foo`.`a` = 1', () => {
        const sql = index_1.escapeMatchProps('foo', { a: 1 });
        expect(sql)
            .toBe('`foo`.`a` = 1');
    });
    it('should return `foo`.`a` IS NULL', () => {
        const sql = index_1.escapeMatchProps('foo', { a: null });
        expect(sql)
            .toBe('`foo`.`a` IS NULL');
    });
    it('should return `foo`.`b` IS NULL', () => {
        const sql = index_1.escapeMatchProps('foo', { b: undefined });
        expect(sql)
            .toBe('`foo`.`b` IS NULL');
    });
    it('should throw error (empty obj)', () => {
        const getlSql = () => index_1.escapeMatchProps('foo', {});
        expect(getlSql)
            .toThrowError();
    });
    it('should throw error (empty obj)', () => {
        const getlSql = () => index_1.escapeMatchProps('foo', {
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
