"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should return COMMIT;', () => {
    const sqlCommitTransactionStatement = index_1.getSqlCommitTransactionStatement();
    expect(sqlCommitTransactionStatement)
        .toBe('COMMIT;');
});
