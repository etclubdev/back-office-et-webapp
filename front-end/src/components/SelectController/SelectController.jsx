import React from 'react'
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { Controller } from "react-hook-form";

export const SelectController = ({ register, name, control, label, menuItems}) => {
    if (!Array.isArray(menuItems)) return;
    return (
        <Controller
            name={name}
            control={control}
            render={({ field }) => (
                <FormControl size="small" fullWidth>
                    <InputLabel>{label}</InputLabel>
                    <Select
                        {...register}
                        {...field}
                        value={menuItems.includes(field.value) ? field.value : ""}
                        onChange={(event) => field.onChange(event.target.value)}
                        label={label}
                    >
                        {menuItems.map((item, index) => (
                            <MenuItem key={`name-menu-item-${index}`} value={item}>
                                {item}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        />
    )
}
