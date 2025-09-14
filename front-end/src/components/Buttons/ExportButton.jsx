import BaseButton from "./BaseButton";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';

const ExportButton = ({ onClick, disabled }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<SystemUpdateAltIcon />}
            sx={{
                backgroundColor: "#007bff", 
                color: "white", 
                "&:hover": { backgroundColor: "#0056b3" }, 
              }}
            disabled={disabled}
        >
            Xuất dữ liệu
        </BaseButton>
    )
};

export default ExportButton;
