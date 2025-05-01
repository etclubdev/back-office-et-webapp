import React from 'react';
import "./TextFieldController.css";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const TextFieldController = ({name, control, type, label, errors, disabled}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <TextField className="text-field" disabled={disabled} size='small' {...field} label={label} fullWidth error={!!errors[name]} helperText={fieldState.error?.message} required />
                </>
            )}
        />
    )
}
