import Button from "@mui/material/Button";

const BaseButton = ({ onClick, children, color = "primary", variant = "contained", size="small", startIcon, sx, disabled }) => {
  return (
    <Button 
        onClick={onClick} 
        color={color} 
        variant={variant} 
        size={size} 
        startIcon={startIcon} 
        sx={{ 
            textTransform: "none", 
            ...sx 
        }}
        disabled={disabled}
    >
      {children}
    </Button>
  );
};

export default BaseButton;
