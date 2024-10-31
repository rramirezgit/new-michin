import React from 'react';

import MuiButton from '@mui/material/Button';
import { Box, type SxProps, CircularProgress } from '@mui/material';

import { SvgColor } from './svg-color';

interface ButtonProps {
  InitialBgColor?: string;
  hoverBgColor?: string;
  w?: number | string | null;
  h?: number;
  gap?: number;
  children: React.ReactNode | string;
  color?: string;
  borderColor?: string;
  border?: string;
  sx?: SxProps;
  icon?: string | null; // Cambiado para permitir null
  onClick?: () => void;
  wIcon?: number;
  hIcon?: number;
  wEndIcon?: number;
  hEndIcon?: number;
  endIcon?: string | null;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const ButtonMichin = ({
  fullWidth,
  InitialBgColor,
  color,
  border,
  type = 'button',
  borderColor,
  endIcon,
  hoverBgColor,
  gap,
  w = null,
  h,
  children,
  wIcon = 25,
  hIcon = 25,
  wEndIcon = 25,
  hEndIcon = 25,
  sx,
  icon = null, // Cambiado el valor por defecto a null
  onClick,
  disabled = false,
  loading = false,
}: ButtonProps) =>
  loading ? (
    <Box>
      <CircularProgress />
    </Box>
  ) : (
    <MuiButton
      fullWidth={fullWidth}
      variant="michin"
      type={type}
      sx={{
        height: h || '40px',
        color: color || 'text.primary',
        width: fullWidth ? '100%' : w || 'auto',
        gap: gap || '0px',
        border: border || '2px solid',
        borderColor: borderColor || 'text.primary',
        '&:after': {
          backgroundColor: InitialBgColor || 'transparent',
        },
        '&:before': {
          backgroundColor: hoverBgColor || 'primary.main',
        },
        '&:disabled': {
          backgroundColor: '#AFAFAF',
          color: 'common.darkerBlue',
        },
        ...sx,
      }}
      startIcon={icon ? <SvgColor src={icon} width={wIcon || 25} height={hIcon || 25} /> : null}
      endIcon={
        endIcon ? <SvgColor src={endIcon} width={wEndIcon || 25} height={hEndIcon || 25} /> : null
      }
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </MuiButton>
  );

export default ButtonMichin;
