import React from 'react';

import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

interface Props {
  status: 'success' | 'error';
}

const FormStatus: React.FC<Props> = ({ status }) => (
  <Box
    sx={{
      padding: {
        xs: '6px 12px',
        md: '10px 20px',
      },
      backgroundColor: status === 'success' ? alpha('#22C55E', 0.2) : alpha('#FF5630', 0.2),
      display: 'inline-block',
      fontFamily: 'Futura Md BT',
      fontSize: {
        xs: 12,
        md: 14,
      },
      fontStyle: 'normal',
      fontWeight: '400',
      borderRadius: '8px',
      border: `1.5px solid ${status === 'success' ? alpha('#22C55E', 0.5) : alpha('#FF5630', 0.5)}`,
      color: status === 'success' ? '#22C55E' : '#FF5630',
    }}
  >
    {status === 'success' ? 'Completado' : 'Incompleto'}
  </Box>
);

export default FormStatus;
