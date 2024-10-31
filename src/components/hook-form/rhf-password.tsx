import type { TextFieldProps } from '@mui/material/TextField';

import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { Iconify } from '../iconify';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  colorInput?: string;
};

export function RHFPassword({ name, helperText, type, colorInput = 'white', ...other }: Props) {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          value={field.value}
          onChange={field.onChange}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
          }}
          InputLabelProps={{
            style: { color: colorInput },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              color: colorInput,
              '&:hover fieldset': {
                borderColor: colorInput, // Borde blanco al pasar el ratón
              },
              '&.Mui-focused fieldset': {
                borderColor: colorInput, // Borde blanco cuando está enfocado
              },
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? (
                    <Iconify icon="eva:eye-off-fill" color="white" />
                  ) : (
                    <Iconify icon="eva:eye-fill" color="white" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...other}
        />
      )}
    />
  );
}
