import React from 'react';
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

export const SelectController = ({ name, control, label, menuItems = [] }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          size="small"
          fullWidth
          error={!!fieldState.error} 
        >
          <InputLabel>{label}</InputLabel>
          <Select
            label={label}
            value={field.value || ""}
            onChange={field.onChange}
            error={!!fieldState.error} 
          >
            {menuItems.map((item, index) => (
              <MenuItem key={`menu-item-${index}`} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
