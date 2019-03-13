import { returnSwitch } from '@ag1/return_switch';
export function getSqlLimitClause(limit, offset) {
    const caseLimitOffset = limit !== undefined && offset !== undefined;
    const caseEmpty = limit === undefined && offset === undefined;
    const caseLimit = limit !== undefined;
    return returnSwitch(true)([
        [caseLimitOffset, `LIMIT ${limit} OFFSET ${offset}`],
        [caseEmpty, ''],
        [caseLimit, `LIMIT ${limit}`],
    ]);
}
//# sourceMappingURL=index.js.map