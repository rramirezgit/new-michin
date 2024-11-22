import type { Product } from 'src/store/ticketsStore';

import React from 'react';
import HeaderBlue from '#/assets/images/tickets/headerDialogTicket-blue.svg';

import {
  Box,
  Dialog,
  useTheme,
  IconButton,
  Typography,
  DialogTitle,
  DialogContent,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useTicketStore } from 'src/store/ticketsStore';
import { subtitleFont, limitedUseFont } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';
import PersonSelector from 'src/components/personal-selector/personal-selector';

import AccessDetails from './dialog-detail';
import DescriptionDisplay from './dialogo-description';
import ButtonMichinWrapper from './button-michin-wrapper';

interface DialogTicketProps {
  open: boolean;
  handleClose: () => void;
  product?: Product | null;
  setOpenDialog: (open: boolean) => void;
  openDialog: boolean;
}

const DialogTicket = ({
  open,
  handleClose,
  product = null,
  setOpenDialog,
  openDialog,
}: DialogTicketProps) => {
  const { selectedTickets } = useTicketStore();

  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const [totalPrice, setTotalPrice] = React.useState(0);

  React.useEffect(() => {
    if (!product) return;

    const selectedTicket = selectedTickets.find((ticket) => ticket.product?.id === product.id);
    const totalPersons = selectedTicket
      ? (selectedTicket?.adultCount || 0) + (selectedTicket?.childCount || 0)
      : 0;

    // Si no hay ticket seleccionado o el total de personas es 0, mostrar el precio unitario
    setTotalPrice(totalPersons > 0 ? product.price * totalPersons : product.price);
  }, [product, selectedTickets]);

  if (!product) {
    return null;
  }

  const titleHeader = (
    <Box
      sx={{
        position: 'absolute',
        top: {
          xs: 12,
          md: 16,
        },
        left: {
          xs: 25,
          md: 25,
        },
        color: 'white',
        fontFamily: limitedUseFont,
        fontSize: '18px',
        display: 'flex',
        gap: '5px',
      }}
    >
      <Typography variant="h3">{product.name}</Typography>
      <Typography variant="h3" color="#F3CB0C">
        ${product.price}
      </Typography>
    </Box>
  );

  const iconClose = (
    <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={{
        position: 'absolute',
        right: {
          xs: 2,
          md: 15,
        },
        top: {
          xs: 0,
          md: 12,
        },
        color: theme.palette.grey[500],
      }}
    >
      <Iconify
        icon="tdesign:close-circle-filled"
        width={24}
        height={24}
        color="#FFFFFF"
        opacity="0.5"
      />
    </IconButton>
  );

  const DialogoContent = (
    <DialogContent
      sx={{
        justifyContent: 'center',
        height: '100%',
        paddingBottom: '100px',
        backgroundColor: 'white',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="overline"
          sx={{
            color: '#312A59',
            fontSize: '18px',
          }}
        >
          {product.name}
        </Typography>
        {/* <Button
          variant="contained"
          sx={{
            backgroundColor: 'rgba(145, 158, 171, 0.05)',
            color: '#637381',
            textTransform: 'none',
            fontFamily: buttonFont,
            borderRadius: '15px',
            gap: '5px',
            fontSize: '12px',
          }}
          onClick={() => {
            // Aquí puedes agregar la lógica para compartir
          }}
        >
          <Iconify icon="ph:share-network-fill" width={14} height={14} />
          Compartir
        </Button> */}
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          maxWidth: '100%',
          alignItems: 'center',
          padding: '8px 0px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '10px',
          }}
        >
          {product.infoTag && (
            <Box
              component={Typography}
              sx={{
                borderRadius: '5px',
                height: '24px',
                padding: '0 10px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                fontSize: '11px',
                fontFamily: subtitleFont,
                backgroundColor: '#1D518B',
                width: 'max-content',
              }}
            >
              {product.infoTag}
            </Box>
          )}
          {product.descriptionTag && (
            <Box
              component={Typography}
              sx={{
                borderRadius: '5px',
                height: '24px',
                padding: '0 10px',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                fontSize: '11px',
                fontFamily: subtitleFont,
                backgroundColor: '#1D518B',
                width: 'max-content',
              }}
            >
              {product.descriptionTag}
            </Box>
          )}
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'flex-start',
              md: 'flex-end',
            },
            mt: {
              xs: 1,
              md: 0,
            },
            marginLeft: 'auto',
            gap: '10px',
            width: {
              xs: '100%',
              md: 'max-content',
            },
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: '#637381',
              fontFamily: subtitleFont,
              fontSize: '12px',
            }}
          >
            SKU:{' '}
            <span
              style={{
                color: '#1D518B',
              }}
            >
              {product.sku}
            </span>
          </Typography>
        </Box>
      </Box>

      <AccessDetails description={product.longDescription} access={product.access} />
      <DescriptionDisplay longDescription={product.longDescription} />
    </DialogContent>
  );

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          width: '680px',
          height: '564px',
          backgroundColor: 'transparent',
          boxShadow: 'none',
          position: 'relative',
        },
      }}
    >
      <DialogTitle
        sx={{
          position: 'relative',
          padding: 0,
          width: '100%',
          background: 'linear-gradient(0deg, white, 75%, transparent)',
        }}
      >
        <HeaderBlue
          sx={{
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />

        {titleHeader}
        {iconClose}
      </DialogTitle>
      {DialogoContent}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          padding: '16px',
          backgroundColor: 'white',
          boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: {
              xs: '100%',
              md: '70%',
            },
            border: '0.896px solid rgba(145, 158, 171, 0.20)',
            borderRadius: '27px',
            padding: smUp ? '10px' : '5px',
            marginRight: {
              xs: 0,
              md: '10px',
            },
            mb: {
              xs: 1,
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: '100%',
                md: '80%',
              },
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ fontFamily: subtitleFont, fontSize: '14px', color: '#99A7B5' }}>
              Precio Total:{' '}
              <span style={{ color: '#312A59', fontSize: 16, fontFamily: limitedUseFont }}>
                ${totalPrice}
              </span>
            </Typography>
          </Box>
          <Box sx={{ width: 'auto' }}>
            <PersonSelector product={product} />
          </Box>
        </Box>
        <Box sx={{ width: { xs: '100%', md: '45%' } }}>
          <ButtonMichinWrapper
            product={product}
            fullWidth
            setOpenDialog={setOpenDialog}
            openDialog={openDialog}
            icon="/assets/icons/tickets/ic-car.svg"
            height={smUp ? 55 : 45}
            fontSize={smUp ? 15 : 11}
          />
        </Box>
      </Box>
    </Dialog>
  );
};

export default DialogTicket;
