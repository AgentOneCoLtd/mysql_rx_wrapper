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
        (autoHandleTransaction as jest.Mock).mockReturnValue(of(RESULT));

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
        (autoHandleTransaction as jest.Mock).mockReturnValue(throwError(new Error('foobar')));

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
        (autoHandleTransaction as jest.Mock).mockReturnValue(of(RESULT));
        (getConnection as jest.Mock).mockReturnValue(of(mockConn));

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

        (autoHandleTransaction as jest.Mock).mockReturnValue(throwError(new Error('foobar')));
        (getConnection as jest.Mock).mockReturnValue(of(mockConn));

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
