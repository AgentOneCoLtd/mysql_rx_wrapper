"use strict";
// tslint:disable:no-unsafe-any
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const query_commit_transaction_1 = require("../query_commit_transaction");
const query_rollback_transaction_1 = require("../query_rollback_transaction");
const query_start_transaction_1 = require("../query_start_transaction");
const index_1 = require("./index");
jest.mock('../query_commit_transaction');
jest.mock('../query_rollback_transaction');
jest.mock('../query_start_transaction');
beforeEach(() => {
    jest.clearAllMocks();
});
it('should commit and return result of query', (done) => {
    const RESULT = 'foobar';
    const mockConnection = {};
    const mockQuery = rxjs_1.of(RESULT);
    const mockCommit = query_commit_transaction_1.queryCommitTransaction.mockReturnValue(rxjs_1.of('commit'));
    const mockRollback = query_rollback_transaction_1.queryRollbackTransaction.mockReturnValue(rxjs_1.of('rollback'));
    const mockStart = query_start_transaction_1.queryStartTransaction.mockReturnValue(rxjs_1.of('start'));
    // HACK: infer mockFunction type
    if (!(jest.isMockFunction(mockCommit) && jest.isMockFunction(mockRollback) && jest.isMockFunction(mockStart))) {
        throw new Error('MOCK_EXPECTED');
    }
    index_1.autoHandleTransaction(mockConnection, mockQuery).subscribe({
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
    const mockConnection = {};
    const mockQuery = rxjs_1.throwError(new Error('foobar'));
    const mockCommit = query_commit_transaction_1.queryCommitTransaction.mockReturnValue(rxjs_1.of('commit'));
    const mockRollback = query_rollback_transaction_1.queryRollbackTransaction.mockReturnValue(rxjs_1.of('rollback'));
    const mockStart = query_start_transaction_1.queryStartTransaction.mockReturnValue(rxjs_1.of('start'));
    // HACK: infer mockFunction type
    if (!(jest.isMockFunction(mockCommit) && jest.isMockFunction(mockRollback) && jest.isMockFunction(mockStart))) {
        throw new Error('MOCK_EXPECTED');
    }
    index_1.autoHandleTransaction(mockConnection, mockQuery).subscribe({
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
