export const convertToArray = (object) => {
    const newArray = [];
    Object.entries(object).forEach(([key, values]) => {
        values.forEach(item => {
            newArray.push(item);
        })
    });
    return newArray;
}