import { of, throwError } from 'rxjs';
import { queryCommitTransaction } from '../query_commit_transaction';
import { queryRollbackTransaction } from '../query_rollback_transaction';
import { queryStartTransaction } from '../query_start_transaction';
import { autoHandleTransaction } from './index';

jest.mock('../query_commit_transaction');
jest.mock('../query_rollback_transaction');
jest.mock('../query_start_transaction');

beforeEach(() => {
    jest.clearAllMocks();
});

it('should commit and return result of query', (done) => {
    const RESULT = 'foobar';
    const mockConnection = {} as any;
    const mockQuery = of(RESULT);

    const mockCommit = (queryCommitTransaction as any).mockReturnValue(of('commit'));
    const mockRollback = (queryRollbackTransaction as any).mockReturnValue(of('rollback'));
    const mockStart = (queryStartTransaction as any).mockReturnValue(of('start'));

    // HACK: infer mockFunction type
    if (!(jest.isMockFunction(mockCommit) && jest.isMockFunction(mockRollback) && jest.isMockFunction(mockStart))) {
        throw new Error('MOCK_EXPECTED');
    }

    autoHandleTransaction(mockConnection, mockQuery).subscribe({
        next(result) {
            expect(result).toBe(RESULT);
        },
        error(error) {
            done.fail(error);
        },
        complete() {
            expect(mockCommit.mock.calls.length).toBe(1);

            expect(mockRollback.mock.calls.length).toBe(0);

            expect(mockStart.mock.calls.length).toBe(1);

            done();
        },
    });
});

it('should rollback and throw error', (done) => {
    const mockConnection = {} as any;
    const mockQuery = throwError(new Error('foobar'));

    const mockCommit = (queryCommitTransaction as any).mockReturnValue(of('commit'));
    const mockRollback = (queryRollbackTransaction as any).mockReturnValue(of('rollback'));
    const mockStart = (queryStartTransaction as any).mockReturnValue(of('start'));

    // HACK: infer mockFunction type
    if (!(jest.isMockFunction(mockCommit) && jest.isMockFunction(mockRollback) && jest.isMockFunction(mockStart))) {
        throw new Error('MOCK_EXPECTED');
    }

    autoHandleTransaction(mockConnection, mockQuery).subscribe({
        next(_result) {
            done.fail('should not be called');
        },
        error(error) {
            expect(error).toBeDefined();

            expect(mockCommit.mock.calls.length).toBe(0);

            expect(mockRollback.mock.calls.length).toBe(1);

            expect(mockStart.mock.calls.length).toBe(1);

            done();
        },
        complete() {
            done.fail('should not be called');
        },
    });
});
