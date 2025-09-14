import BaseButton from "./BaseButton";
import FactCheckIcon from '@mui/icons-material/FactCheck';

const ApproveButton = ({ onClick, disabled }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<FactCheckIcon />}
            sx={{
                backgroundColor: "#0F9960", 
                color: "white", 
                "&:hover": { backgroundColor: "#0c7549ff" }, 
              }}
            disabled={disabled}
        >
            Phê duyệt
        </BaseButton>
    )
};

export default ApproveButton;
