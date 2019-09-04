import { escape, escapeId } from 'mysql';

export function escapeMatchProps(table: string, matchProps: object): string {
    const matchPropsStr = escape(matchProps);

    if (matchPropsStr.length === 0) {
        throw new Error('MATCH_PROPS_EXPECTED');
    }

    return matchPropsStr
        .split(',')
        .map((str) => `${escapeId(table)}.${str.trim()}`)
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
