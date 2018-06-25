"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should get mocked okPacket', () => {
    expect(index_1.mockOkPacket())
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
