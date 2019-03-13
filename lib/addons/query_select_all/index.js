"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
const query_1 = require("../../cores/query");
const join_str_list_1 = require("../../utils/join_str_list");
const get_sql_limit_clause_1 = require("../get_sql_limit_clause");
function getSqlSelectAllStatement(table, limit, offset) {
    return join_str_list_1.joinStrList([`SELECT * FROM ${mysql_1.escapeId(table)}`, `${get_sql_limit_clause_1.getSqlLimitClause(limit, offset)}`, ';']);
}
exports.getSqlSelectAllStatement = getSqlSelectAllStatement;
function querySelectAll(param) {
    const { table, limit, offset, connection } = param;
    const sqlSelectStatement = getSqlSelectAllStatement(table, limit, offset);
    return query_1.query({
        sql: sqlSelectStatement,
        connection,
    });
}
exports.querySelectAll = querySelectAll;
//# sourceMappingURL=index.js.map