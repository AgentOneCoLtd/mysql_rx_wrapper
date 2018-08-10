import { getSqlInsertStatement, queryInsert } from './index';

describe('getSqlInsertStatement', () => {
    it('should return INSERT INTO `foobar` SET ?;', () => {
        const sqlInsertStatement = getSqlInsertStatement('foobar');

        expect(sqlInsertStatement).toBe('INSERT INTO `foobar` SET ?;');
    });
});

describe('queryInsert', () => {
    it('should throw error (empty value object)', () => {
        const fx = () =>
            queryInsert({
                table: 'table',
                values: {},
                connection: 'conn' as any,
            });

        expect(fx).toThrowError();
    });
});
