"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should get [result, fields]', (done) => {
    const mockResult = 'result';
    const mockFields = 'fields';
    const mockQueryFn = jest.fn((_option, cb) => cb(undefined, mockResult, mockFields));
    const mockConnection = {
        query: mockQueryFn,
    };
    index_1.query({
        sql: '',
        connection: mockConnection,
    }).subscribe({
        next([result, fields]) {
            expect(result)
                .toBe(mockResult);
            expect(fields)
                .toBe(mockFields);
        },
        error(error) {
            done.fail(error);
        },
        complete: done,
    });
});
it('should get error', (done) => {
    const mockResult = 'result';
    const mockFields = 'fields';
    const mockQueryFn = jest.fn((_option, cb) => cb(new Error('error'), mockResult, mockFields));
    const mockConnection = {
        query: mockQueryFn,
    };
    index_1.query({
        sql: '',
        connection: mockConnection,
    }).subscribe({
        next([_result, _fields]) {
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
