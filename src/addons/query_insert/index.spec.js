"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should return INSERT INTO foobar SET ?;', () => {
    const sqlInsertStatement = index_1.getSqlInsertStatement('foobar');
    expect(sqlInsertStatement)
        .toBe('INSERT INTO foobar SET ?;');
});
