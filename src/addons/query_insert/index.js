"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = require("../../cores/query");
function getSqlInsertStatement(table) {
    return `INSERT INTO ${table} SET ?;`;
}
exports.getSqlInsertStatement = getSqlInsertStatement;
function queryInsert(param) {
    const { table, values, connection } = param;
    const sqlInsertStatement = getSqlInsertStatement(table);
    return query_1.query({
        sql: sqlInsertStatement,
        values,
        connection,
    });
}
exports.queryInsert = queryInsert;
