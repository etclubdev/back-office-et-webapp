import BaseButton from "./BaseButton";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({ onClick }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<EditIcon />}
            sx={{
                backgroundColor: "#E0E0E0", 
                color: "#212121", 
                "&:hover": { backgroundColor: "#BDBDBD" }, 
                boxShadow: "none",
              }}
        >
            Chỉnh sửa
        </BaseButton>

    )
};

export default EditButton;