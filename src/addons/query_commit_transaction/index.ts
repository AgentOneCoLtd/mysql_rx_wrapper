import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query } from '../../cores/query';

export function getSqlCommitTransactionStatement() {
    return 'COMMIT;';
}

export interface IQueryCommitTransactionParam {
    connection: Connection | PoolConnection;
}
export function queryCommitTransaction(param: IQueryCommitTransactionParam) {
    const { connection } = param;

    const sqlCommitTransactionStatement = getSqlCommitTransactionStatement();

    return query<IOkPacket>({
        sql: sqlCommitTransactionStatement,
        connection,
    });
}
