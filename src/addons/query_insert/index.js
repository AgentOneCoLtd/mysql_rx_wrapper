"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_object_1 = require("@ag1/empty_object");
const mysql_1 = require("mysql");
const query_1 = require("../../cores/query");
function getSqlInsertStatement(table) {
    return `INSERT INTO ${mysql_1.escapeId(table)} SET ?;`;
}
exports.getSqlInsertStatement = getSqlInsertStatement;
function queryInsert(param) {
    const { table, values, connection } = param;
    if (empty_object_1.isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }
    const sqlInsertStatement = getSqlInsertStatement(table);
    return query_1.query({
        sql: sqlInsertStatement,
        values,
        connection,
    });
}
exports.queryInsert = queryInsert;
