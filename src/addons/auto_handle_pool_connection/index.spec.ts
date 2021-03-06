import { of, throwError, Observable } from 'rxjs';
import { getConnection } from '../../cores/pool_get_connection';
import { autoHandlePoolConnection, getQueryResult } from './index';

jest.mock('../../cores/pool_get_connection');

describe('getQueryResult', () => {
    it('should return [connection, result]', (done) => {
        const mockConn = 'conn' as any;
        const RESULT = 'foobar';
        const mockQueryConnHigherOrder = (_conn: any): Observable<string> => of(RESULT);

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
        const mockConn = 'conn' as any;
        const mockQueryConnHigherOrder = (_conn: any): Observable<never> => throwError(new Error('foobar'));

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

describe('autoHandlePoolConnection', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return result and release connection', (done) => {
        const mockReleaseFn = jest.fn();
        const mockConn = {
            release: mockReleaseFn,
        } as any;

        const RESULT = 'foobar';
        const mockQueryConnHigherOrder = (_conn: any): Observable<string> => of(RESULT);

        (getConnection as jest.Mock).mockReturnValue(of(mockConn));

        autoHandlePoolConnection(mockConn, mockQueryConnHigherOrder).subscribe({
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

        const mockQueryConnHigherOrder = (_conn: any): Observable<never> => throwError(new Error('foobar'));

        (getConnection as jest.Mock).mockReturnValue(of(mockConn));

        autoHandlePoolConnection(mockConn, mockQueryConnHigherOrder).subscribe({
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
