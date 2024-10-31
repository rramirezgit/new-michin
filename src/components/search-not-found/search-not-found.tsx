import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

type SearchNotFoundProps = BoxProps & {
  query?: string;
};

export function SearchNotFound({ query, sx, ...other }: SearchNotFoundProps) {
  if (!query) {
    return (
      <Typography variant="body2" sx={{ ...sx, color: 'black' }}>
        Por favor, ingrese palabras clave
      </Typography>
    );
  }

  return (
    <Box sx={{ textAlign: 'center', borderRadius: 1.5, ...sx }} {...other}>
      <Box sx={{ mb: 1, typography: 'h6', color: 'black' }}>No encontrado</Box>

      <Typography variant="body2" sx={{ color: 'black' }}>
        No se encontraron resultados para &nbsp;
        <strong>{`"${query}"`}</strong>
        .
        <br /> Intente verificar errores tipográficos o usar palabras completas.
      </Typography>
    </Box>
  );
}
