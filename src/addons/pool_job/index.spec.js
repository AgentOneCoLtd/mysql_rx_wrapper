"use strict";
// tslint:disable:no-unsafe-any
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const deprecate_1 = require("../../utils/deprecate");
const auto_handle_pool_connection_transaction_1 = require("../auto_handle_pool_connection_transaction");
const index_1 = require("./index");
jest.mock('../auto_handle_pool_connection_transaction');
jest.mock('../../utils/deprecate');
beforeEach(() => {
    jest.clearAllMocks();
});
it('should call deprecate function', () => {
    auto_handle_pool_connection_transaction_1.autoPoolConnTrx.mockReturnValue(rxjs_1.of('foo'));
    deprecate_1.deprecate.mockImplementation(jest.fn());
    index_1.poolJob({}, jest.fn());
    expect(deprecate_1.deprecate).toHaveBeenCalledTimes(1);
    expect(deprecate_1.deprecate).toHaveBeenCalledWith('use autoPoolConnTrx or autoHandlePoolConnectionTransaction instead');
    expect(auto_handle_pool_connection_transaction_1.autoPoolConnTrx).toHaveBeenCalledTimes(1);
});
