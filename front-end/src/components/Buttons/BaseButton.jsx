import Button from "@mui/material/Button";

const BaseButton = ({ onClick, children, color = "primary", variant = "contained", size="medium", startIcon, sx }) => {
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
    >
      {children}
    </Button>
  );
};

export default BaseButton;
