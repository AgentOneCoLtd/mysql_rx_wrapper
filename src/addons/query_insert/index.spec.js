"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('getSqlInsertStatement', () => {
    it('should return INSERT INTO foobar SET ?;', () => {
        const sqlInsertStatement = index_1.getSqlInsertStatement('foobar');
        expect(sqlInsertStatement)
            .toBe('INSERT INTO foobar SET ?;');
    });
});
describe('queryInsert', () => {
    it('should throw error (empty value object)', () => {
        const fx = () => index_1.queryInsert({
            table: 'table',
            values: {},
            connection: 'conn',
        });
        expect(fx)
            .toThrowError();
    });
});
