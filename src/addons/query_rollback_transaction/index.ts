import { Connection, PoolConnection } from 'mysql';
import { IOkPacket } from '../../cores/ok_packet';
import { query } from '../../cores/query';

export function getSqlRollbackTransactionStatement() {
    return 'ROLLBACK;';
}

export interface IQueryRollbackTransactionParam {
    connection: Connection | PoolConnection;
}
export function queryRollbackTransaction(param: IQueryRollbackTransactionParam) {
    const { connection } = param;

    const sqlRollbackTransactionStatement = getSqlRollbackTransactionStatement();

    return query<IOkPacket>({
        sql: sqlRollbackTransactionStatement,
        connection,
    });
}
