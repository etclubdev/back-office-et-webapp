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
  const [itemIdKey, itemNameKey] = menuItems.length > 0 && typeof menuItems[0] === "object"
    ? Object.keys(menuItems[0])
    : [null, null];
    
  const renderMenuItem = (item, index) => (
    <MenuItem
      key={`menu-item-${index}`}
      value={itemIdKey ? item[itemIdKey] : item}
    >
      {itemNameKey ? item[itemNameKey] : item}
    </MenuItem>
  );

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
            value={field.value ?? ""}
            onChange={field.onChange}
          >
            {menuItems.map((item, index) => renderMenuItem(item, index))}
          </Select>
          {fieldState.error && (
            <FormHelperText>{fieldState.error.message}</FormHelperText>
          )}
        </FormControl>
      )}
    />
  );
};
