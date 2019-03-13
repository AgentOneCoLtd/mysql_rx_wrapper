import { bindNodeCallback } from 'rxjs';
export function query(param) {
    const { connection, ...option } = param;
    const fn = (callback) => connection.query(option, callback);
    return bindNodeCallback(fn.bind(fn))();
}
//# sourceMappingURL=index.js.map