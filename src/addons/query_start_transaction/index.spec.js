"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should return START TRANSACTION;', () => {
    const sqlStartTransactionStatement = index_1.getSqlStartTransactionStatement();
    expect(sqlStartTransactionStatement).toBe('START TRANSACTION;');
});
