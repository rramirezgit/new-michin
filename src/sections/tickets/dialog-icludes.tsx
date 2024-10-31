import React from 'react';

import { Box, Typography } from '@mui/material';

interface Props {
  includedItems?: string;
}

const IncludedItemsDisplay = ({
  includedItems = 'Incluye:\nAlimento (ración de tilapia y calamar americano) y Ayuda de un Profesional.\n prueba',
}: Props) => {
  const paragraphs = includedItems.split('\n'); // Dividir en párrafos

  return (
    <Box
      sx={{
        color: '#637381',
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      {paragraphs.map((paragraph, index) => (
        <Typography
          key={index}
          variant="body2"
          sx={{
            color: '#808A94',
            fontSize: '13px',
            marginBottom: index !== paragraphs.length - 1 ? '12px' : '0px', // Margen entre párrafos excepto en el último
          }}
        >
          {paragraph}
        </Typography>
      ))}
    </Box>
  );
};

export default IncludedItemsDisplay;
