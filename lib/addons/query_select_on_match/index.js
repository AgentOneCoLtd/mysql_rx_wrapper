"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_object_1 = require("@ag1/empty_object");
const mysql_1 = require("mysql");
const query_1 = require("../../cores/query");
const join_str_list_1 = require("../../utils/join_str_list");
const escape_match_props_1 = require("../escape_match_props");
const get_sql_limit_clause_1 = require("../get_sql_limit_clause");
function getSqlSelectOnMatchStatement(table, matchProps, limit, offset) {
    return join_str_list_1.joinStrList([
        `SELECT * FROM ${mysql_1.escapeId(table)}`,
        `WHERE ${escape_match_props_1.escapeMatchProps(table, matchProps)}`,
        `${get_sql_limit_clause_1.getSqlLimitClause(limit, offset)}`,
        ';',
    ]);
}
exports.getSqlSelectOnMatchStatement = getSqlSelectOnMatchStatement;
function querySelectOnMatch(param) {
    const { table, matchProps, limit, offset, connection } = param;
    if (empty_object_1.isEmptyObject(matchProps)) {
        throw new Error('NO_EMPTY_OBJECT');
    }
    const sqlSelectStatement = getSqlSelectOnMatchStatement(table, matchProps, limit, offset);
    return query_1.query({
        sql: sqlSelectStatement,
        connection,
    });
}
exports.querySelectOnMatch = querySelectOnMatch;
//# sourceMappingURL=index.js.map