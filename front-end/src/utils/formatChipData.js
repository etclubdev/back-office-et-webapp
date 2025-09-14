export const formatChipData = (chipdata) => {
    const formattedChipData = chipdata?.map((label, index) => ({
        key: index,
        label: label,
        isSelected: false,
    }));
    
    return formattedChipData;
}