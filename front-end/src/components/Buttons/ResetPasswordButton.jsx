import BaseButton from "./BaseButton";
import KeyIcon from '@mui/icons-material/Key';

const ResetPasswordButton = ({ onClick, disabled }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<KeyIcon />}
            sx={{
                backgroundColor: "#E0E0E0", 
                color: "#212121", 
                "&:hover": { backgroundColor: "#BDBDBD" }, 
                boxShadow: "none",
              }}
            disabled={disabled}
        >
            Đặt lại mật khẩu
        </BaseButton>

    )
};

export default ResetPasswordButton;