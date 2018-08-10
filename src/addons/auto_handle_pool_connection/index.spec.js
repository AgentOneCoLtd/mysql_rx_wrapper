"use strict";
// tslint:disable:no-unsafe-any
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const pool_get_connection_1 = require("../../cores/pool_get_connection");
const index_1 = require("./index");
jest.mock('../../cores/pool_get_connection');
describe('getQueryResult', () => {
    it('should return [connection, result]', (done) => {
        const mockConn = 'conn';
        const RESULT = 'foobar';
        const mockQueryConnHigherOrder = (_conn) => rxjs_1.of(RESULT);
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
        const mockConn = 'conn';
        const mockQueryConnHigherOrder = (_conn) => rxjs_1.throwError(new Error('foobar'));
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
describe('autoHandlePoolConnection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should return result and release connection', (done) => {
        const mockReleaseFn = jest.fn();
        const mockConn = {
            release: mockReleaseFn,
        };
        const RESULT = 'foobar';
        const mockQueryConnHigherOrder = (_conn) => rxjs_1.of(RESULT);
        const mockGetConn = pool_get_connection_1.getConnection.mockReturnValue(rxjs_1.of(mockConn));
        // HACK: infer mockFunction type
        if (!jest.isMockFunction(mockGetConn)) {
            throw new Error('MOCK_EXPECTED');
        }
        index_1.autoHandlePoolConnection(mockConn, mockQueryConnHigherOrder).subscribe({
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
        const mockQueryConnHigherOrder = (_conn) => rxjs_1.throwError(new Error('foobar'));
        const mockGetConn = pool_get_connection_1.getConnection.mockReturnValue(rxjs_1.of(mockConn));
        // HACK: infer mockFunction type
        if (!jest.isMockFunction(mockGetConn)) {
            throw new Error('MOCK_EXPECTED');
        }
        index_1.autoHandlePoolConnection(mockConn, mockQueryConnHigherOrder).subscribe({
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
