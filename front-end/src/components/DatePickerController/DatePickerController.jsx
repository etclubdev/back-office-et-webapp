import React from 'react';
import { Controller } from "react-hook-form";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from 'dayjs';

export const DatePickerController = ({ name, label, control }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: "Vui lòng chọn ngày" }}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label={label}
            value={field.value ? dayjs(field.value) : null}
            format="DD-MM-YYYY"
            onChange={(newValue) => {
              const value = newValue ? dayjs(newValue).format("YYYY-MM-DD") : null;
              field.onChange(value);
            }}
            slotProps={{
              textField: {
                size: "small",
                fullWidth: true,
                error: !!fieldState.error,
                helperText: fieldState.error?.message,
              },
            }}
          />
        </LocalizationProvider>
      )}
    />
  )
}
