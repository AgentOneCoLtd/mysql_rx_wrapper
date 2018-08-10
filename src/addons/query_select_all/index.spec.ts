import { getSqlSelectAllStatement } from './index';

describe('getSqlSelectAllStatement', () => {
    it('should return SELECT * FROM `foo` ;', () => {
        const sql = getSqlSelectAllStatement('foo');

        expect(sql).toBe('SELECT * FROM `foo` ;');
    });

    it('should return SELECT * FROM `foo` LIMIT 2 OFFSET 0 ;', () => {
        const sql = getSqlSelectAllStatement('foo', 2, 0);

        expect(sql).toBe('SELECT * FROM `foo` LIMIT 2 OFFSET 0 ;');
    });
});
