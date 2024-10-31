/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import { Alert, Tooltip } from '@mui/material';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { useRouter } from 'src/routes/hooks';

import { useTicketStore } from 'src/store/ticketsStore';
import { buttonFont, secondaryFont } from 'src/theme/core';

import { SvgColor } from 'src/components/svg-color';
import ButtonMichin from 'src/components/btn-michin';
import PersonSelector from 'src/components/personal-selector/personal-selector';

import { Iconify } from '../iconify';

export function CartComponent() {
  const router = useRouter();
  const { selectedTickets, setSelectedTickets, isCartOpen, toggleCart, setCartButtonRef } =
    useTicketStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const cartButtonRef = useRef<HTMLButtonElement>(null);
  const ticketCount = selectedTickets.reduce(
    (total, ticket) => total + (ticket.adultCount || 0) + (ticket.childCount || 0),
    0
  );

  const handleOpenCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    toggleCart();
  };

  const handleCloseCart = () => {
    setAnchorEl(null);
    toggleCart();
  };

  const handleRemoveTicket = (ticketId: string) => {
    setSelectedTickets(selectedTickets.filter((ticket) => ticket.product?.id !== ticketId));
  };

  useEffect(() => {
    setCartButtonRef(cartButtonRef);
  }, []);

  useEffect(() => {
    if (selectedTickets.length === 0 && isCartOpen) {
      toggleCart();
    }
  }, [selectedTickets]);

  return (
    <>
      <IconButton onClick={handleOpenCart} ref={cartButtonRef}>
        <SvgColor src="/assets/icons/navbar/ic-car.svg" width={22} height={22} color="white" />
        {ticketCount > 0 && (
          <Box
            sx={{
              position: 'absolute',
              top: 1,
              right: 2,
              width: 16,
              height: 16,
              borderRadius: '50%',
              backgroundColor: 'red',
              fontFamily: secondaryFont,
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 10,
            }}
          >
            {ticketCount}
          </Box>
        )}
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={isCartOpen}
        onClose={handleCloseCart}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        slotProps={{
          paper: {
            sx: {
              width: {
                xs: 350,
                md: 538,
              },
              maxWidth: '100%',
              backgroundColor: 'white',
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '15px',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: buttonFont,
              color: 'black',
              fontSize: 16,
            }}
          >
            Mi carrito
          </Typography>
          <IconButton onClick={handleCloseCart} size="small">
            <Iconify icon="iconamoon:close" width={20} height={20} color="common.darkBlue" />
          </IconButton>
        </Box>
        <Divider />
        {selectedTickets.length > 0 ? (
          <>
            {/* Ticket List */}
            {selectedTickets.map((ticket) => (
              <MenuItem key={ticket.product?.id} disableRipple>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr) 0.5fr', // 5 columnas en móvil
                    gap: 1,
                    alignItems: 'center',
                    width: '100%',
                    padding: 1,
                  }}
                >
                  <Tooltip
                    title={
                      ticket?.product?.name && ticket?.product?.name?.length > 25
                        ? ticket.product?.name
                        : ''
                    }
                  >
                    <Typography
                      sx={{
                        gridColumn: {
                          xs: 'span 5', // Ocupa 5 espacios en móvil
                          md: 'span 2', // Ocupa 2 espacios en escritorio
                        },
                        fontSize: 15,
                        color: 'black',
                        fontFamily: 'Futura Md BT',
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '19.734px',
                        letterSpacing: '0px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        maxWidth: '100%',
                      }}
                    >
                      {ticket.product?.name}
                    </Typography>
                  </Tooltip>
                  <Box sx={{ gridColumn: { xs: 'span 2', md: 'span 1' } }}>
                    <PersonSelector product={ticket.product} />
                  </Box>
                  <Typography
                    sx={{
                      gridColumn: { xs: 'span 2', md: 'span 1' },
                      textAlign: 'center',
                      color: '#1C252E',
                      fontFamily: 'Futura Hv BT',
                      fontSize: 16,
                      fontStyle: 'normal',
                      fontWeight: 400,
                    }}
                  >
                    $
                    {(ticket.product?.price || 0) *
                      ((ticket?.adultCount || 0) + (ticket?.childCount || 0))}
                  </Typography>
                  <IconButton
                    onClick={() => handleRemoveTicket(ticket?.product?.id || '')}
                    disableFocusRipple
                    disableRipple
                  >
                    <SvgColor src="/assets/icons/tickets/ic-trash.svg" />
                  </IconButton>
                </Box>
              </MenuItem>
            ))}

            {!selectedTickets.some((ticket) => ticket.product?.access) && (
              <Alert
                severity="warning"
                sx={{
                  marginX: '5px',
                  marginBottom: '10px',
                  backgroundColor: ' rgba(0, 184, 217, 0.08)',
                  color: '#006C9C',
                  '& .MuiAlert-icon': {
                    color: '#006C9C',
                  },
                }}
              >
                Para poder entrar al acuario y disfrutar de toda la experiencia, necesitas comprar
                tu boleto de acceso.
              </Alert>
            )}

            {!selectedTickets.some((ticket) => !ticket.product?.access) && (
              <Alert
                severity="info"
                sx={{
                  marginX: '5px',
                  marginBottom: '10px',
                  backgroundColor: ' rgba(0, 184, 217, 0.08)',
                  color: '#006C9C',
                  '& .MuiAlert-icon': {
                    color: '#006C9C',
                  },
                }}
              >
                Puedes complementar tu visita con nuestras actividades e interacciones.
              </Alert>
            )}

            <Divider />

            {/* Finalize Button */}
            <MenuItem disableRipple disableTouchRipple>
              <ButtonMichin
                fullWidth
                h={50}
                color="common.darkBlue"
                InitialBgColor="#FFCE07"
                border="none"
                onClick={() => {
                  router.push('/product/checkout');
                  handleCloseCart();
                }}
              >
                Finalizar compra
              </ButtonMichin>
            </MenuItem>
          </>
        ) : (
          <Alert
            severity="info"
            icon={<SvgColor src="/assets/icons/tickets/carts.svg" />}
            sx={{
              marginX: '5px',
              marginTop: '10px',

              marginBottom: '10px',
              backgroundColor: ' rgba(0, 184, 217, 0.08)',
              color: '#006C9C',
              '& .MuiAlert-icon': {
                color: '#006C9C',
              },
            }}
          >
            Tu carrito se encuentra vacío
          </Alert>
        )}
      </Menu>
    </>
  );
}
