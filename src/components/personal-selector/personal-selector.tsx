/* eslint-disable @typescript-eslint/no-shadow */
import type { Product } from 'src/store/ticketsStore';

import React, { useState, useEffect } from 'react';

import { Box, Menu, Button, MenuItem, Typography } from '@mui/material';

import { useTicketStore } from 'src/store/ticketsStore';
import { buttonFont, subtitleFont } from 'src/theme/core';

import ButtonMichin from 'src/components/btn-michin';

import Counter from '../counter';
import { Iconify } from '../iconify';

interface PersonSelectorProps {
  disabled?: boolean;
  product?: Product | null;
}

const PersonSelector: React.FC<PersonSelectorProps> = ({ disabled = false, product = null }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [adultCount, setAdultCount] = useState(0);
  const [childCount, setChildCount] = useState(0);

  const { selectedTickets, setSelectedTickets } = useTicketStore();

  const countPersons = selectedTickets
    .filter((ticket) => ticket.product?.id === product?.id)
    .reduce((acc, ticket) => acc + (ticket?.adultCount || 0) + (ticket?.childCount || 0), 0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    handlePersonCountChange(adultCount, childCount);
    setAnchorEl(null);
  };

  const handleCountChange = (type: 'adult' | 'child', count: number) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    type === 'adult' ? setAdultCount(count) : setChildCount(count);
  };

  const handleApply = () => {
    handlePersonCountChange(adultCount, childCount);
    handleClose();
  };

  useEffect(() => {
    setAdultCount(
      selectedTickets.find((ticket) => ticket.product?.id === product?.id)?.adultCount || 0
    );
    setChildCount(
      selectedTickets.find((ticket) => ticket.product?.id === product?.id)?.childCount || 0
    );
  }, [selectedTickets, product]);

  const getPersonLabel = (count: number) => {
    if (count === 0)
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <Iconify icon="ion:person-add-outline" color="#231F20" width={17} height={17} />
        </Box>
      );
    if (count === 1) return `${count} Persona`;
    return `${count} Personas`;
  };

  const personLabel = getPersonLabel(countPersons);

  const handlePersonCountChange = (adultCount: number, childCount: number) => {
    if (product) {
      const existingTicket = selectedTickets.find((ticket) => ticket.product?.id === product.id);

      const isRemovingTicket = adultCount === 0 && childCount === 0;

      if (existingTicket) {
        if (isRemovingTicket) {
          // Eliminar ticket si las cantidades son 0
          setSelectedTickets(selectedTickets.filter((ticket) => ticket.product?.id !== product.id));
        } else {
          // Actualizar ticket existente
          setSelectedTickets(
            selectedTickets.map((ticket) =>
              ticket.product?.id === product.id ? { ...ticket, adultCount, childCount } : ticket
            )
          );
        }
      } else if (!isRemovingTicket) {
        // Agregar nuevo ticket si no está en la lista y las cantidades no son 0
        setSelectedTickets([...selectedTickets, { product, adultCount, childCount }]);
      }
    }
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={disabled}
        sx={{
          borderRadius: '50px',
          border: '0.9px solid rgba(145, 158, 171, 0.12)',
          background: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 12px 8px 14px',
          width: {
            xs: '100%',
            lg: countPersons > 0 ? '120px' : '10px',
          },
          minHeight: '36px',
          transition: 'width 0.3s ease-in-out, all 0.3s ease-in-out', // Asegúrate de que el ancho esté en la transición
        }}
      >
        <Typography
          sx={{
            fontSize: '14px',
            width: '100%',
            color: '#231F20',
            fontFamily: subtitleFont,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '100%', // Asegúrate de que maxWidth esté configurado correctamente
            transition: 'max-width 0.3s ease-in-out',
          }}
        >
          {personLabel}
        </Typography>
        <Iconify icon="mingcute:down-line" color="#231F20" width={20} height={20} />
      </Button>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              width: '304px',
              '& .MuiMenuItem-root': {
                '&:hover': {
                  backgroundColor: 'transparent',
                },
              },
            },
          },
        }}
        MenuListProps={{
          sx: {
            padding: 0,
          },
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {renderMenuItem('Adultos', 'Desde 18 años', adultCount, 'adult')}
        {renderMenuItem('Niños', 'Desde 3 a 17 años', childCount, 'child')}
        <MenuItem disableRipple>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            <ButtonMichin
              h={39}
              w="40%"
              color="common.darkBlue"
              InitialBgColor="#FFCE07"
              border="none"
              onClick={handleApply}
            >
              <Typography
                sx={{
                  color: 'common.darkerBlue',
                  fontSize: '14px',
                  fontFamily: buttonFont,
                }}
              >
                Aplicar
              </Typography>
            </ButtonMichin>
          </Box>
        </MenuItem>
      </Menu>
    </>
  );

  function renderMenuItem(label: string, subLabel: string, count: number, type: 'adult' | 'child') {
    return (
      <MenuItem disableRipple>
        <Box sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              alignItems: 'center',
            }}
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'var(--text-primary, #1C252E)',
                  fontFamily: '"Futura Hv BT"',
                  fontSize: '16px',
                  fontStyle: 'normal',
                  fontWeight: 'var(--h6-weight, 400)',
                  lineHeight: 'var(--h6-line-height, 28px)',
                  letterSpacing: 'var(--h6-letter-spacing, 0px)',
                }}
              >
                {label}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'var(--text-secondary, #637381)',
                  fontFamily: '"Futura Bk BT"',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: 'var(--body2-weight, 400)',
                  lineHeight: 'var(--body2-line-height, 22px)',
                  letterSpacing: 'var(--body2-letter-spacing, 0px)',
                }}
              >
                {subLabel}
              </Typography>
            </Box>
            <Counter value={count} onChange={(count) => handleCountChange(type, count)} />
          </Box>
        </Box>
      </MenuItem>
    );
  }
};

export default PersonSelector;
