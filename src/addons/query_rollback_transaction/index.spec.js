"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should return ROLLBACK;', () => {
    const sqlRollbackTransactionStatement = index_1.getSqlRollbackTransactionStatement();
    expect(sqlRollbackTransactionStatement)
        .toBe('ROLLBACK;');
});
