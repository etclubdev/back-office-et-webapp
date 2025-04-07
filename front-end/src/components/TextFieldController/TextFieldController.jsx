import React from 'react';
import { TextField, FormHelperText } from "@mui/material";
import { Controller } from "react-hook-form";

export const TextFieldController = ({name, control, type, label, errors, disabled}) => {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <TextField disabled={disabled} size='small' {...field} label={label} fullWidth error={!!errors[name]} helperText={fieldState.error?.message} required />
                </>
            )}
        />
    )
}
