export function joinStrList(strList) {
    return strList
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .join('\u0020');
}
//# sourceMappingURL=index.js.map