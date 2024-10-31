import React from 'react';

import { Box, IconButton } from '@mui/material';

import { Iconify } from '../iconify';

interface CounterProps {
  value: number;
  onChange: (count: number) => void;
  error?: boolean;
}

const Counter: React.FC<CounterProps> = ({ value, onChange, error }) => {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    onChange(value > 0 ? value - 1 : 0);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderRadius="50px"
      border="1px solid #e0e0e0"
      padding="6px"
      bgcolor="#f9f9f9"
      sx={{
        border: error ? '1px solid #f00' : '1px solid #e0e0e0',
      }}
    >
      <IconButton
        size="small"
        onClick={handleDecrement}
        color="primary"
        style={{ backgroundColor: value === 0 ? '#f0f0f0' : '#FFCE07' }}
        disabled={value === 0}
      >
        <Iconify
          icon="uil:minus"
          color={value === 0 ? '#c0c0c0' : 'black'}
          width={16}
          height={16}
        />
      </IconButton>
      <Box sx={{ margin: '0 12px', color: '#000' }}>{value}</Box>
      <IconButton
        size="small"
        onClick={handleIncrement}
        color="primary"
        style={{ backgroundColor: '#FFCE07' }}
      >
        <Iconify icon="uil:plus" color="black" width={16} height={16} />
      </IconButton>
    </Box>
  );
};

export default Counter;
