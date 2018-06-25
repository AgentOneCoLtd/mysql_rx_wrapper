import { getSqlInsertStatement } from './index';

it('should return INSERT INTO foobar SET ?;', () => {
    const sqlInsertStatement = getSqlInsertStatement('foobar');

    expect(sqlInsertStatement)
        .toBe('INSERT INTO foobar SET ?;');
});
