import BaseButton from "./BaseButton";
import InventoryIcon from '@mui/icons-material/Inventory';

const ArchiveButton = ({ onClick, disabled }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<InventoryIcon />}
            sx={{
                backgroundColor: "#D32F2F", 
                color: "white", 
                "&:hover": { backgroundColor: "#9d2626ff" }, 
              }}
            disabled={disabled}
        >
            Lưu trữ
        </BaseButton>
    )
};

export default ArchiveButton;
