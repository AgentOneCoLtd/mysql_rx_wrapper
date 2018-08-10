"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_object_1 = require("@ag1/empty_object");
const mysql_1 = require("mysql");
const query_1 = require("../../cores/query");
const join_str_list_1 = require("../../utils/join_str_list");
const escape_match_props_1 = require("../escape_match_props");
const get_sql_limit_clause_1 = require("../get_sql_limit_clause");
function getSqlUpdateOnMatchStatement(table, matchProps, limit) {
    return join_str_list_1.joinStrList([
        `UPDATE ${mysql_1.escapeId(table)} SET ?`,
        `WHERE ${escape_match_props_1.escapeMatchProps(table, matchProps)}`,
        `${get_sql_limit_clause_1.getSqlLimitClause(limit)}`,
        ';',
    ]);
}
exports.getSqlUpdateOnMatchStatement = getSqlUpdateOnMatchStatement;
function queryUpdateOnMatch(param) {
    const { table, matchProps, values, limit, connection } = param;
    if (empty_object_1.isEmptyObject(matchProps) || empty_object_1.isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }
    const sqlUpdateStatement = getSqlUpdateOnMatchStatement(table, matchProps, limit);
    return query_1.query({
        sql: sqlUpdateStatement,
        values,
        connection,
    });
}
exports.queryUpdateOnMatch = queryUpdateOnMatch;
