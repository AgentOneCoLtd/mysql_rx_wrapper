"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('getSqlUpdateOnMatchStatement', () => {
    it("should return UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' ;", () => {
        const sql = index_1.getSqlUpdateOnMatchStatement('foo', { a: 'a' });
        expect(sql).toBe("UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' ;");
    });
    it("should return UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' LIMIT 2 ;", () => {
        const sql = index_1.getSqlUpdateOnMatchStatement('foo', { a: 'a' }, 2);
        expect(sql).toBe("UPDATE `foo` SET ? WHERE `foo`.`a` = 'a' LIMIT 2 ;");
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
        expect(fx).toThrowError();
    });
    it('should throw error (empty values)', () => {
        const fx = () => index_1.queryUpdateOnMatch({
            table: 'table',
            matchProps: { a: 'a' },
            values: {},
            connection: 'conn',
        });
        expect(fx).toThrowError();
    });
});
