import { getSqlCommitTransactionStatement } from './index';

it('should return COMMIT;', () => {
    const sqlCommitTransactionStatement = getSqlCommitTransactionStatement();

    expect(sqlCommitTransactionStatement).toBe('COMMIT;');
});
