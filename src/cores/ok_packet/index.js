"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mockOkPacket() {
    return {
        fieldCount: 0,
        affectedRows: 0,
        insertId: 0,
        serverStatus: 0,
        warningCount: 0,
        message: '',
        protocol41: false,
        changedRows: 0,
    };
}
exports.mockOkPacket = mockOkPacket;
