import { getSqlRollbackTransactionStatement } from './index';

it('should return ROLLBACK;', () => {
    const sqlRollbackTransactionStatement = getSqlRollbackTransactionStatement();

    expect(sqlRollbackTransactionStatement)
        .toBe('ROLLBACK;');
});
