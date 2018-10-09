"use strict";
// tslint:disable:no-unsafe-any
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const pool_get_connection_1 = require("../../cores/pool_get_connection");
const auto_handle_transaction_1 = require("../auto_handle_transaction");
const index_1 = require("./index");
jest.mock('../auto_handle_transaction');
jest.mock('../../cores/pool_get_connection');
beforeEach(() => {
    jest.clearAllMocks();
});
describe('getQueryResult', () => {
    it('should return [connection, result]', (done) => {
        const RESULT = 'foobar';
        const mockAutoHandleTransaction = auto_handle_transaction_1.autoHandleTransaction.mockReturnValue(rxjs_1.of(RESULT));
        // HACK: infer mockFunction type
        if (!jest.isMockFunction(mockAutoHandleTransaction)) {
            throw new Error('MOCK_EXPECTED');
        }
        const mockConn = 'conn';
        const mockQueryConnHigherOrder = jest.fn();
        index_1.getQueryResult(mockConn, mockQueryConnHigherOrder).subscribe({
            next([connection, result]) {
                expect(connection).toBe(mockConn);
                expect(result).toBe(RESULT);
            },
            error(error) {
                done.fail(error);
            },
            complete: done,
        });
    });
    it('should throw [connection, error]', (done) => {
        const mockAutoHandleTransaction = auto_handle_transaction_1.autoHandleTransaction.mockReturnValue(rxjs_1.throwError(new Error('foobar')));
        // HACK: infer mockFunction type
        if (!jest.isMockFunction(mockAutoHandleTransaction)) {
            throw new Error('MOCK_EXPECTED');
        }
        const mockConn = 'conn';
        const mockQueryConnHigherOrder = jest.fn();
        index_1.getQueryResult(mockConn, mockQueryConnHigherOrder).subscribe({
            next([_connection, _result]) {
                done.fail('should not be called');
            },
            error([connection, error]) {
                expect(connection).toBe(mockConn);
                expect(error).toBeDefined();
                done();
            },
            complete() {
                done.fail('should not be called');
            },
        });
    });
});
describe('autoPoolConnTrx', () => {
    it('should return result and release connection', (done) => {
        const mockReleaseFn = jest.fn();
        const mockConn = {
            release: mockReleaseFn,
        };
        const mockQueryConnHigherOrder = jest.fn();
        const RESULT = 'foobar';
        const mockAutoHandleTransaction = auto_handle_transaction_1.autoHandleTransaction.mockReturnValue(rxjs_1.of(RESULT));
        const mockGetConn = pool_get_connection_1.getConnection.mockReturnValue(rxjs_1.of(mockConn));
        // HACK: infer mockFunction type
        if (!(jest.isMockFunction(mockAutoHandleTransaction) && jest.isMockFunction(mockGetConn))) {
            throw new Error('MOCK_EXPECTED');
        }
        index_1.autoPoolConnTrx(mockConn, mockQueryConnHigherOrder).subscribe({
            next(result) {
                expect(result).toBe(RESULT);
            },
            error(error) {
                done.fail(error);
            },
            complete() {
                expect(mockReleaseFn.mock.calls.length).toBe(1);
                done();
            },
        });
    });
    it('should throw error and release connection', (done) => {
        const mockReleaseFn = jest.fn();
        const mockConn = {
            release: mockReleaseFn,
        };
        const mockQueryConnHigherOrder = jest.fn();
        const mockAutoHandleTransaction = auto_handle_transaction_1.autoHandleTransaction.mockReturnValue(rxjs_1.throwError(new Error('foobar')));
        const mockGetConn = pool_get_connection_1.getConnection.mockReturnValue(rxjs_1.of(mockConn));
        // HACK: infer mockFunction type
        if (!(jest.isMockFunction(mockAutoHandleTransaction) && jest.isMockFunction(mockGetConn))) {
            throw new Error('MOCK_EXPECTED');
        }
        index_1.autoPoolConnTrx(mockConn, mockQueryConnHigherOrder).subscribe({
            next(_result) {
                done.fail('should not be called');
            },
            error(error) {
                expect(error).toBeDefined();
                expect(mockReleaseFn.mock.calls.length).toBe(1);
                done();
            },
            complete() {
                done.fail('should not be called');
            },
        });
    });
});
