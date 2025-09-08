import BaseButton from "./BaseButton";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ onClick, disabled , color}) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<DeleteIcon />}
            sx={{
                backgroundColor: color || "#E0E0E0", 
                color: color ? "white" :"#212121", 
                "&:hover": { backgroundColor: color || "#BDBDBD" }, 
                boxShadow: "none",
              }}
            disabled={disabled}
        >
            Xóa
        </BaseButton>

    )
};

export default DeleteButton;