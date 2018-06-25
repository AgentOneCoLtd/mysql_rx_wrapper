"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empty_object_1 = require("@ag1/empty_object");
const mysql_1 = require("mysql");
const query_1 = require("../../cores/query");
function escapeMatchProps(table, matchProps) {
    const matchPropsStr = mysql_1.escape(matchProps);
    if (matchPropsStr.length === 0) {
        throw new Error('MATCH_PROPS_EXPECTED');
    }
    return matchPropsStr
        .split(',')
        .map((str) => `${mysql_1.escapeId(table)}.${str.trim()}`)
        .join('\u0020AND\u0020');
}
exports.escapeMatchProps = escapeMatchProps;
function getSqlUpdateOnMatchStatement(table, matchProps) {
    return `UPDATE ${table} SET ? WHERE ${escapeMatchProps(table, matchProps)};`;
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
