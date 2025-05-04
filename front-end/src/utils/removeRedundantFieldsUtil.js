export const removeRedundantField = (object) => {
    return Object.fromEntries(
        Object.entries(object).filter(([_, value]) => value !== "" && value !== undefined && value !== null)
    );
};