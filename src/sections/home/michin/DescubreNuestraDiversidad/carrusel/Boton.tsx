import React from 'react';

import { IconButton } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { Iconify } from 'src/components/iconify';

interface BotonCarruselProps {
  onClick: any;
  showLeftIcon?: boolean;
  direction?: 'left' | 'right' | 'up' | 'down';
}

const BotonCarrusel = ({
  onClick,
  showLeftIcon = true,
  direction = 'left',
}: BotonCarruselProps) => {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');
  return (
    <IconButton
      onClick={onClick}
      sx={{
        width: {
          xs: 36,
          sm: 38,
        },
        height: {
          xs: 36,
          sm: 38,
        },
        color: alpha(theme.palette.common.white, 0.8),
        backgroundColor: theme.palette.secondary.main,
        opacity: showLeftIcon ? 1 : 0,
        transition: 'opacity 0.5s ease-in-out',
        '&:hover': {
          color: theme.palette.common.white,
          backgroundColor: theme.palette.secondary.main,
        },
      }}
    >
      <Iconify
        icon={`carbon:arrow-${direction}`}
        width={smUp ? 23 : 20}
        color="#2C3346"
        style={{
          transform: 'scaleX(-1)',
        }}
      />
    </IconButton>
  );
};

export default BotonCarrusel;
