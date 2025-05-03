export const sortedEntries = (arr, lastKey) => {
    return Object.entries(arr).sort(([keyA], [keyB]) => {
        if (keyA === lastKey) return 1;
        if (keyB === lastKey) return -1;
        return 0; 
    });
}
  