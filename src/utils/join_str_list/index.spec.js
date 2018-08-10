"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
it('should join string with white space', () => {
    const strList = [' 1', '2 ', ' ', '3'];
    const result = index_1.joinStrList(strList);
    expect(result).toBe('1 2 3');
});
