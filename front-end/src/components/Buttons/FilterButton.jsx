import BaseButton from "./BaseButton";
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const FilterButton = ({ onClick }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<FilterAltIcon />}
            sx={{
                backgroundColor: "#E0E0E0", 
                color: "#212121", 
                "&:hover": { backgroundColor: "#BDBDBD" }, 
                boxShadow: "none",
              }}
        >
            Lọc
        </BaseButton>

    )
};

export default FilterButton;