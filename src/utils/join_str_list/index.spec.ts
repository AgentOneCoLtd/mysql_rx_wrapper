import { joinStrList } from './index';

it('should join string with white space', () => {
    const strList = [' 1', '2 ', ' ', '3'];

    const result = joinStrList(strList);

    expect(result).toBe('1 2 3');
});
