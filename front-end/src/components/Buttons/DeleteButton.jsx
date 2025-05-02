import BaseButton from "./BaseButton";
import DeleteIcon from "@mui/icons-material/Delete";

const DeleteButton = ({ onClick }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<DeleteIcon />}
            sx={{
                backgroundColor: "#E0E0E0", 
                color: "#212121", 
                "&:hover": { backgroundColor: "#BDBDBD" }, 
                boxShadow: "none",
              }}
        >
            Xóa
        </BaseButton>

    )
};

export default DeleteButton;