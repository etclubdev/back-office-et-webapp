import React from 'react';
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const TextFieldController = ({name, control, type, label, errors, disabled, required = true, rows, multiline}) => {
    const labelWithAsterisk = (
        <span>
            {label}
            {required && <span style={{ color: 'red' }}> *</span>}
        </span>
    );
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <>
                    <TextField className="text-field" rows={rows} multiline={multiline} disabled={disabled} size='small' {...field} label={labelWithAsterisk} fullWidth error={!!errors[name]} helperText={fieldState.error?.message} />
                </>
            )}
        />
    )
}
