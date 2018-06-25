import { mockOkPacket } from './index';

it('should get mocked okPacket', () => {
    expect(mockOkPacket())
        .toEqual({
            fieldCount: 0,
            affectedRows: 0,
            insertId: 0,
            serverStatus: 0,
            warningCount: 0,
            message: '',
            protocol41: false,
            changedRows: 0,
        });
});
