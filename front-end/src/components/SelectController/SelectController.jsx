import React from 'react'
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";

export const SelectController = ({ name, control, label, menuItems }) => {
    if (!Array.isArray(menuItems) || menuItems.length === 0) return;

    const [value, itemName] = Object.keys(menuItems[0])

    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl size="small" fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...field}
                        label={label}
                        value={field.value || ""}
                        onChange={(event) => field.onChange(event.target.value)}
                    >
                        {menuItems.map((item, index) => (
                            <MenuItem key={`name-menu-item-${index}`} value={item[value] || item}>
                                {item[itemName] || item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />

    )
}
