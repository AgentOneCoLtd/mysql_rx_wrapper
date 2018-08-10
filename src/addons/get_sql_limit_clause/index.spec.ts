import { getSqlLimitClause } from './index';

it('should return limit and offset', () => {
    const sqlLimitClause = getSqlLimitClause(1, 0);

    expect(sqlLimitClause).toBe('LIMIT 1 OFFSET 0');
});

it('should return empty string', () => {
    const sqlLimitClause = getSqlLimitClause();

    expect(sqlLimitClause).toBe('');
});

it('should return only limit', () => {
    const sqlLimitClause = getSqlLimitClause(1);

    expect(sqlLimitClause).toBe('LIMIT 1');
});

it('should throw error if offset present but limit absent', () => {
    expect(() => getSqlLimitClause(undefined, 0)).toThrowError();
});
