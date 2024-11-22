import type { InputProps } from '@mui/material';
import type { TextFieldProps } from '@mui/material/TextField';

import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

type Props = TextFieldProps & {
  name: string;
  colorInput?: string;
  inputProps?: InputProps;
};

export function RHFTextField({
  name,
  helperText,
  type,
  colorInput = 'white',
  inputProps,
  ...other
}: Props) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error?.message ?? helperText}
          inputProps={{
            autoComplete: 'off',
            ...inputProps,
          }}
          InputLabelProps={{
            style: { color: colorInput }, // Asegura que la etiqueta sea siempre blanca
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
          {...other}
        />
      )}
    />
  );
}
