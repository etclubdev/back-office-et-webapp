export const groupByVisibility = (array) => {
    const visibleItems = array.filter(item => item.visible);
    const invisibleItems = array.filter(item => !item.visible);
    return {
        visible: visibleItems,
        invisible: invisibleItems
    }
}