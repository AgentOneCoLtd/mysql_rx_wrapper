"use strict";
// tslint:disable:no-unsafe-any
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should get pool connection', (done) => {
    const mockResult = 'result';
    const mockGetConnectionFn = jest.fn((cb) => cb(undefined, mockResult));
    const mockPool = {
        getConnection: mockGetConnectionFn,
    };
    index_1.getConnection(mockPool).subscribe({
        next(connection) {
            expect(connection).toBe(mockResult);
            expect(mockGetConnectionFn.mock.calls.length).toBe(1);
        },
        error(error) {
            done.fail(error);
        },
        complete: done,
    });
});
it('should get error', (done) => {
    const mockResult = 'result';
    const mockGetConnectionFn = jest.fn((cb) => cb(new Error('error'), mockResult));
    const mockPool = {
        getConnection: mockGetConnectionFn,
    };
    index_1.getConnection(mockPool).subscribe({
        next(_connection) {
            done.fail('should not be called');
        },
        error(error) {
            expect(error).toBeDefined();
            done();
        },
        complete() {
            done.fail('should not be called');
        },
    });
});
