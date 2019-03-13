"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const return_switch_1 = require("@ag1/return_switch");
function getSqlLimitClause(limit, offset) {
    const caseLimitOffset = limit !== undefined && offset !== undefined;
    const caseEmpty = limit === undefined && offset === undefined;
    const caseLimit = limit !== undefined;
    return return_switch_1.returnSwitch(true)([
        [caseLimitOffset, `LIMIT ${limit} OFFSET ${offset}`],
        [caseEmpty, ''],
        [caseLimit, `LIMIT ${limit}`],
    ]);
}
exports.getSqlLimitClause = getSqlLimitClause;
//# sourceMappingURL=index.js.map