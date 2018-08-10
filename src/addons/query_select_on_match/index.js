"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_object_1 = require("@ag1/empty_object");
const mysql_1 = require("mysql");
const query_1 = require("../../cores/query");
const escape_match_props_1 = require("../escape_match_props");
function getSqlSelectOnMatchStatement(table, matchProps) {
    return `SELECT * FROM ${mysql_1.escapeId(table)} WHERE ${escape_match_props_1.escapeMatchProps(table, matchProps)};`;
}
exports.getSqlSelectOnMatchStatement = getSqlSelectOnMatchStatement;
function querySelectOnMatch(param) {
    const { table, matchProps, connection } = param;
    if (empty_object_1.isEmptyObject(matchProps)) {
        throw new Error('NO_EMPTY_OBJECT');
    }
    const sqlSelectStatement = getSqlSelectOnMatchStatement(table, matchProps);
    return query_1.query({
        sql: sqlSelectStatement,
        connection,
    });
}
exports.querySelectOnMatch = querySelectOnMatch;
