// tslint:disable:no-unsafe-any

import { of, throwError } from 'rxjs';
import { getConnection } from '../../cores/pool_get_connection';
import { autoHandleTransaction } from '../auto_handle_transaction';
import { autoPoolConnTrx, getQueryResult } from './index';

jest.mock('../auto_handle_transaction');
jest.mock('../../cores/pool_get_connection');

beforeEach(() => {
    jest.clearAllMocks();
});

describe('getQueryResult', () => {
    it('should return [connection, result]', (done) => {
        const RESULT = 'foobar';
        const mockAutoHandleTransaction = (autoHandleTransaction as any).mockReturnValue(of(RESULT));

        // HACK: infer mockFunction type
        if (!jest.isMockFunction(mockAutoHandleTransaction)) {
            throw new Error('MOCK_EXPECTED');
        }

        const mockConn = 'conn' as any;
        const mockQueryConnHigherOrder = jest.fn();

        getQueryResult(mockConn, mockQueryConnHigherOrder).subscribe({
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
        const mockAutoHandleTransaction = (autoHandleTransaction as any).mockReturnValue(
            throwError(new Error('foobar')),
        );

        // HACK: infer mockFunction type
        if (!jest.isMockFunction(mockAutoHandleTransaction)) {
            throw new Error('MOCK_EXPECTED');
        }

        const mockConn = 'conn' as any;
        const mockQueryConnHigherOrder = jest.fn();

        getQueryResult(mockConn, mockQueryConnHigherOrder).subscribe({
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
        } as any;

        const mockQueryConnHigherOrder = jest.fn();

        const RESULT = 'foobar';
        const mockAutoHandleTransaction = (autoHandleTransaction as any).mockReturnValue(of(RESULT));
        const mockGetConn = (getConnection as any).mockReturnValue(of(mockConn));

        // HACK: infer mockFunction type
        if (!(jest.isMockFunction(mockAutoHandleTransaction) && jest.isMockFunction(mockGetConn))) {
            throw new Error('MOCK_EXPECTED');
        }

        autoPoolConnTrx(mockConn, mockQueryConnHigherOrder).subscribe({
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
        } as any;

        const mockQueryConnHigherOrder = jest.fn();

        const mockAutoHandleTransaction = (autoHandleTransaction as any).mockReturnValue(
            throwError(new Error('foobar')),
        );
        const mockGetConn = (getConnection as any).mockReturnValue(of(mockConn));

        // HACK: infer mockFunction type
        if (!(jest.isMockFunction(mockAutoHandleTransaction) && jest.isMockFunction(mockGetConn))) {
            throw new Error('MOCK_EXPECTED');
        }

        autoPoolConnTrx(mockConn, mockQueryConnHigherOrder).subscribe({
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
