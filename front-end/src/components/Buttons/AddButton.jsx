import BaseButton from "./BaseButton";
import AddIcon from "@mui/icons-material/Add";

const AddButton = ({ onClick }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<AddIcon />}
            sx={{
                backgroundColor: "#007bff", 
                color: "white", 
                "&:hover": { backgroundColor: "#0056b3" }, 
              }}
        >
            Thêm mới
        </BaseButton>
    )
};

export default AddButton;
