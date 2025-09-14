import BaseButton from "./BaseButton";
import RestoreIcon from '@mui/icons-material/Restore';

const RestoreButton = ({ onClick, disabled }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<RestoreIcon />}
            sx={{
                backgroundColor: "#0F9960", 
                color: "white", 
                "&:hover": { backgroundColor: "#0b8150ff" }, 
              }}
            disabled={disabled}
        >
            Khôi phục
        </BaseButton>
    )
};

export default RestoreButton;
