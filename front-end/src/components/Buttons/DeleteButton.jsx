import BaseButton from "./BaseButton";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ onClick, disabled , color}) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<DeleteIcon />}
            sx={{
                backgroundColor: "#D32F2F", 
                color: "white", 
                "&:hover": { backgroundColor: "#9d2626ff" }, 
              }}
            disabled={disabled}
        >
            Xóa
        </BaseButton>

    )
};

export default DeleteButton;