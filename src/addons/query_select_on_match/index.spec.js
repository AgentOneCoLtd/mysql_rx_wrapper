"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('getSqlSelectOnMatchStatement', () => {
    it("should return SELECT * FROM `foo` WHERE `foo`.`a` = 'a' ;", () => {
        const sql = index_1.getSqlSelectOnMatchStatement('foo', { a: 'a' });
        expect(sql).toBe("SELECT * FROM `foo` WHERE `foo`.`a` = 'a' ;");
    });
    it("should return SELECT * FROM `foo` WHERE `foo`.`a` = 'a' LIMIT 2 OFFSET 0 ;", () => {
        const sql = index_1.getSqlSelectOnMatchStatement('foo', { a: 'a' }, 2, 0);
        expect(sql).toBe("SELECT * FROM `foo` WHERE `foo`.`a` = 'a' LIMIT 2 OFFSET 0 ;");
    });
});
describe('querySelectOnMatch', () => {
    it('should throw error (empty matchProps)', () => {
        const fx = () => index_1.querySelectOnMatch({
            table: 'table',
            matchProps: {},
            connection: 'conn',
        });
        expect(fx).toThrowError();
    });
});
