import React from 'react';
import { Controller } from "react-hook-form";
import { FormHelperText, IconButton, OutlinedInput, InputLabel, InputAdornment, FormControl } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const PasswordController = ({ control, name, label, setValue, errors, size = 'small' }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (setValue) {
      setValue(name, inputValue);
    }
  };

  return (
    <Controller
      name={name} 
      control={control}
      render={({ field }) => (
        <FormControl size={size} variant="outlined" fullWidth error={!!errors[name]}>
          <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>
          <OutlinedInput
            {...field}
            onChange={handleChange}
            value={field.value}
            label={label}
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          {errors[name] && <FormHelperText error>{errors[name].message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
};