"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should end connection', (done) => {
    const mockResult = 'result';
    const mockConnectFn = jest.fn((cb) => cb(undefined, mockResult));
    const mockConnection = {
        end: mockConnectFn,
    };
    index_1.end(mockConnection).subscribe({
        next(result) {
            expect(result)
                .toBe(mockResult);
            expect(mockConnectFn.mock.calls.length)
                .toBe(1);
        },
        error(error) {
            done.fail(error);
        },
        complete: done,
    });
});
it('should get error', (done) => {
    const mockResult = 'result';
    const mockConnectFn = jest.fn((cb) => cb(new Error('error'), mockResult));
    const mockConnection = {
        end: mockConnectFn,
    };
    index_1.end(mockConnection).subscribe({
        next(_result) {
            done.fail('should not be called');
        },
        error(error) {
            expect(error)
                .toBeDefined();
            done();
        },
        complete() {
            done.fail('should not be called');
        },
    });
});
