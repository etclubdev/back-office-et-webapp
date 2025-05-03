import React from 'react';
import { Controller } from 'react-hook-form';
import { Switch, FormControlLabel } from '@mui/material';

export const SwitchController = ({name, control, label}) => {
  return (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={Boolean(field.value)}
                  {...field}
                />
              }
              label={label}
            />
          )
        }
      />
  )
}
