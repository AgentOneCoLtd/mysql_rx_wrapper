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
export declare function mockOkPacket(): IOkPacket;
//# sourceMappingURL=index.d.ts.map