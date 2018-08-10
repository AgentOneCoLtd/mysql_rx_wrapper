"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = require("mysql");
function escapeMatchProps(table, matchProps) {
    const matchPropsStr = mysql_1.escape(matchProps);
    if (matchPropsStr.length === 0) {
        throw new Error('MATCH_PROPS_EXPECTED');
    }
    return matchPropsStr
        .split(',')
        .map((str) => `${mysql_1.escapeId(table)}.${str.trim()}`)
        .map((str) => {
        const parts = str.split('\u0020');
        const L = 0;
        const R = 2;
        if (parts[R] === 'NULL') {
            return `${parts[L]} IS ${parts[R]}`;
        }
        return str;
    })
        .join('\u0020AND\u0020');
}
exports.escapeMatchProps = escapeMatchProps;
