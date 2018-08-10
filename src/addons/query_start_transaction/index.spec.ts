import { getSqlStartTransactionStatement } from './index';

it('should return START TRANSACTION;', () => {
    const sqlStartTransactionStatement = getSqlStartTransactionStatement();

    expect(sqlStartTransactionStatement).toBe('START TRANSACTION;');
});
