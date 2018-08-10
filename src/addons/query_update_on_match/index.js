"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_object_1 = require("@ag1/empty_object");
const mysql_1 = require("mysql");
const query_1 = require("../../cores/query");
const escape_match_props_1 = require("../escape_match_props");
function getSqlUpdateOnMatchStatement(table, matchProps) {
    return `UPDATE ${mysql_1.escapeId(table)} SET ? WHERE ${escape_match_props_1.escapeMatchProps(table, matchProps)};`;
}
exports.getSqlUpdateOnMatchStatement = getSqlUpdateOnMatchStatement;
function queryUpdateOnMatch(param) {
    const { table, matchProps, values, connection } = param;
    if (empty_object_1.isEmptyObject(matchProps) || empty_object_1.isEmptyObject(values)) {
        throw new Error('NO_EMPTY_OBJECT');
    }
    const sqlUpdateStatement = getSqlUpdateOnMatchStatement(table, matchProps);
    return query_1.query({
        sql: sqlUpdateStatement,
        values,
        connection,
    });
}
exports.queryUpdateOnMatch = queryUpdateOnMatch;
