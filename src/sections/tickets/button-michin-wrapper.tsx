import type { Product } from 'src/store/ticketsStore';

import React from 'react';

import { Typography } from '@mui/material';

import { buttonFont } from 'src/theme/core';
import { useTicketStore } from 'src/store/ticketsStore';

import ButtonMichin from 'src/components/btn-michin';

interface ButtonMichinWrapperProps {
  product?: Product | null;
  icon?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  height?: number; // Optional, in case different heights are needed
  color?: string;
  initialBgColor?: string;
  border?: string;
  fontSize?: number;
  w?: number | null;
  setOpenDialog?: (open: boolean) => void;
  openDialog?: boolean;
}

const ButtonMichinWrapper: React.FC<ButtonMichinWrapperProps> = ({
  icon,
  disabled = false,
  fullWidth = false,
  height = 39, // Default height
  color = 'common.darkBlue', // Default color
  initialBgColor = '#FFCE07', // Default initial background color
  border = 'none', // Default border
  w = null,
  fontSize = 11,
  product = null,
  setOpenDialog,
  openDialog,
}) => {
  const { selectedTickets, setSelectedTickets, cartButtonRef } = useTicketStore();

  const countPersons = selectedTickets
    .filter((ticket) => ticket.product?.id === product?.id)
    .reduce((acc, ticket) => acc + (ticket.adultCount || 0) + (ticket.childCount || 0), 0);

  const handleClick = () => {
    if (countPersons === 0) {
      if (product) {
        setSelectedTickets([...selectedTickets, { product, adultCount: 1, childCount: 0 }]);
      }
    } else {
      if (openDialog) {
        if (setOpenDialog) {
          setOpenDialog(false);
        }
      }
      setTimeout(() => {
        if (cartButtonRef?.current) {
          cartButtonRef.current.click(); // Simular un clic en el botón del carrito
        }
      }, 100);
    }
  };

  return (
    <ButtonMichin
      h={height}
      w={w}
      color={color}
      InitialBgColor={initialBgColor}
      border={border}
      icon={icon}
      fullWidth={fullWidth}
      onClick={handleClick}
      disabled={disabled}
    >
      <Typography
        sx={{
          color: 'common.darkerBlue',
          fontSize,
          fontFamily: buttonFont,
        }}
      >
        {countPersons > 0 ? 'Ver carrito' : 'Agregar a carrito'}
      </Typography>
    </ButtonMichin>
  );
};

export default ButtonMichinWrapper;
