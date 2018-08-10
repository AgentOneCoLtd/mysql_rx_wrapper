export function joinStrList(strList: string[]) {
    return strList
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .join('\u0020');
}
