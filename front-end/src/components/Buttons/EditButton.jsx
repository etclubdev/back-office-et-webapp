import BaseButton from "./BaseButton";
import EditIcon from "@mui/icons-material/Edit";

const EditButton = ({ onClick, disabled }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<EditIcon />}
            sx={{
                backgroundColor: "#0F9960",
                color: "white",
                "&:hover": { backgroundColor: "#0b8150ff" },
            }}
            disabled={disabled}
        >
            Chỉnh sửa
        </BaseButton>

    )
};

export default EditButton;