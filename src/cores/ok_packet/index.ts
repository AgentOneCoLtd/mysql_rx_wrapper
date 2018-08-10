export interface IOkPacket {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    serverStatus: number;
    warningCount: number;
    message: string;
    protocol41: boolean;
    changedRows: number;
}

export function mockOkPacket(): IOkPacket {
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
