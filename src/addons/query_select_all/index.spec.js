"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
describe('getSqlSelectAllStatement', () => {
    it('should return SELECT * FROM `foo` ;', () => {
        const sql = index_1.getSqlSelectAllStatement('foo');
        expect(sql).toBe('SELECT * FROM `foo` ;');
    });
    it('should return SELECT * FROM `foo` LIMIT 2 OFFSET 0 ;', () => {
        const sql = index_1.getSqlSelectAllStatement('foo', 2, 0);
        expect(sql).toBe('SELECT * FROM `foo` LIMIT 2 OFFSET 0 ;');
    });
});
