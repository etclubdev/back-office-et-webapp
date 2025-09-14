import BaseButton from "./BaseButton";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ onClick, disabled }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<AddIcon />}
            sx={{
                backgroundColor: "#007bff", 
                color: "white", 
                "&:hover": { backgroundColor: "#0056b3" }, 
              }}
            disabled={disabled}
        >
            Thêm mới
        </BaseButton>
    )
};

export default AddButton;
