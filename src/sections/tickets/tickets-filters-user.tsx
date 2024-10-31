import type { SelectChangeEvent } from '@mui/material';

import React from 'react';
import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import { Box, alpha, Button, Select, MenuItem, Typography, useMediaQuery } from '@mui/material';

type Option = {
  value: string;
  label: string;
  icon?: string;
};

type TicketsFiltersProps = {
  options: Option[];
  activeFilter: 'past' | 'future';
  setActiveFilter: (filter: 'past' | 'future') => void;
  buttonWidth?: number;
  buttonHeight?: number;
};

const TicketsFiltersUser = ({
  options,
  activeFilter,
  setActiveFilter,
  buttonWidth = 310,
  buttonHeight = 55,
}: TicketsFiltersProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setActiveFilter(event.target.value as 'past' | 'future');
  };

  if (isMobile) {
    return (
      <Select
        value={activeFilter}
        onChange={handleSelectChange}
        sx={{
          width: '100%',
          mt: 3,
          backgroundColor: '#1E2B62',
          color: 'white',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1E2B62',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1E2B62',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#1E2B62',
          },
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
          '& .MuiPaper-root': {
            backgroundColor: '#1E2B62',
          },
          '& .MuiMenuItem-root': {
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&.Mui-selected': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
              },
            },
          },
        }}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: '#1E2B62',
            },
          },
        }}
        displayEmpty
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography sx={{ color: 'white' }}>{option.label}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: '16px' }}>
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => setActiveFilter(option.value as 'past' | 'future')}
          startIcon={
            option.icon && <Image src={option.icon} alt={option.label} width={32} height={32} />
          }
          sx={{
            mt: 3,
            backgroundColor: activeFilter === option.value ? '#1E2B62' : 'rgba(30, 43, 98, 0.15)',
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: '8px',
            justifyContent: 'flex-start',
            paddingLeft: '16px',
            '&:hover': {
              backgroundColor:
                activeFilter === option.value ? alpha('#1E2B62', 0.8) : 'rgba(30, 43, 98, 0.1)',
            },
          }}
        >
          <Typography
            variant="button"
            sx={{ fontSize: '16px', marginLeft: option.icon ? '8px' : 0 }}
          >
            {option.label}
          </Typography>
        </Button>
      ))}
    </Box>
  );
};

export default TicketsFiltersUser;
