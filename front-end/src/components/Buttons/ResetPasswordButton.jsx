import BaseButton from "./BaseButton";
import KeyIcon from '@mui/icons-material/Key';

const ResetPasswordButton = ({ onClick }) => {
    return (
        <BaseButton
            onClick={onClick}
            startIcon={<KeyIcon />}
            sx={{
                backgroundColor: "#007bff", 
                color: "white", 
                "&:hover": { backgroundColor: "#0056b3" }, 
              }}
        >
            Đặt lại mật khẩu
        </BaseButton>

    )
};

export default ResetPasswordButton;