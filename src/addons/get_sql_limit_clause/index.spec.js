"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should return limit and offset', () => {
    const sqlLimitClause = index_1.getSqlLimitClause(1, 0);
    expect(sqlLimitClause).toBe('LIMIT 1 OFFSET 0');
});
it('should return empty string', () => {
    const sqlLimitClause = index_1.getSqlLimitClause();
    expect(sqlLimitClause).toBe('');
});
it('should return only limit', () => {
    const sqlLimitClause = index_1.getSqlLimitClause(1);
    expect(sqlLimitClause).toBe('LIMIT 1');
});
it('should throw error if offset present but limit absent', () => {
    expect(() => index_1.getSqlLimitClause(undefined, 0)).toThrowError();
});
