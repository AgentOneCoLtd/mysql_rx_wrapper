// tslint:disable:no-unsafe-any

import { of } from 'rxjs';
import { deprecate } from '../../utils/deprecate';
import { autoPoolConnTrx } from '../auto_handle_pool_connection_transaction';
import { poolJob } from './index';

jest.mock('../auto_handle_pool_connection_transaction');
jest.mock('../../utils/deprecate');

beforeEach(() => {
    jest.clearAllMocks();
});

it('should call deprecate function', () => {
    (autoPoolConnTrx as any).mockReturnValue(of('foo'));
    (deprecate as any).mockImplementation(jest.fn());

    poolJob({} as any, jest.fn());

    expect(deprecate).toHaveBeenCalledTimes(1);
    expect(deprecate).toHaveBeenCalledWith('use autoPoolConnTrx or autoHandlePoolConnectionTransaction instead');

    expect(autoPoolConnTrx).toHaveBeenCalledTimes(1);
});
