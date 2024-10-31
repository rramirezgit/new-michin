import type { Breakpoint } from '@mui/material';
// Importa el tipo Product
import type { Product } from 'src/store/ticketsStore';

import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Button, Skeleton, Typography } from '@mui/material';

import { subtitleFont, limitedUseFont } from 'src/theme/core';

import { Logo } from 'src/components/logo';
import PersonSelector from 'src/components/personal-selector/personal-selector';

import DialogTicket from './dialog-ticket';
import ButtonMichinWrapper from './button-michin-wrapper';

interface TicketMichinProps {
  product: Product;
  disabled?: boolean | undefined;
}

const TicketMichin = ({ product, disabled = false }: TicketMichinProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const layoutQuery: Breakpoint = 'md';

  const truncateDescription = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
  };

  useEffect(() => {
    let isFirstRender = true;
    if (isFirstRender) {
      isFirstRender = false;
      return;
    }
    if (!openDialog) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 0.5);
    }
  }, [openDialog]);

  const handleCloseDialog = () => {
    setLoading(true);
    setOpenDialog(false);
    setTimeout(() => {
      setLoading(false);
    }, 1);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const renderImage = () => (
    <Box
      sx={{
        width: '100%',
        height: {
          xs: 'max-content',
          sm: '100%',
        },
        backgroundColor: '#1E2B62',
        backgroundImage: `url(${product.image})`,
        backgroundSize: 'cover',
        borderRadius: '15px',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        alignItems: 'center',
        padding: {
          xs: '12px',
          md: '18px',
        },
      }}
    >
      <Logo
        data-slot="logo"
        localidad="CDMX"
        width={theme.breakpoints.up(layoutQuery) ? 78.7 : 65}
        height={theme.breakpoints.up(layoutQuery) ? 22.9 : 18.9}
      />
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          textShadow: '0px 3.281px 3.281px rgba(0, 0, 0, 0.25)',
        }}
      >
        {truncateText(product.name, 44)}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          textAlign: 'center',
          textShadow: '0px 3.281px 3.281px rgba(0, 0, 0, 0.25)',
          color: '#F3CB0C',
        }}
      >
        ${product.price}
      </Typography>
    </Box>
  );

  const renderEdad = (
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: '100px',
        backgroundColor: '#1E2B62',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        padding: '10px',
        fontSize: '11px',
      }}
    >
      <Typography
        sx={{
          fontFamily: limitedUseFont,
          fontSize: {
            xs: '12px',
            sm: '14px',
          },
          position: 'relative',
          top: '2px',
        }}
      >
        {product.age}
      </Typography>
      <Typography
        sx={{
          fontSize: '11px',
          position: 'relative',
          top: '-4px',
        }}
      >
        años
      </Typography>
    </Box>
  );

  const renderInfo = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        gap: '10px',
        flex: 1,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            color: '#312A59',
            fontFamily: limitedUseFont,
            fontSize: {
              xs: '12px',
              sm: '17px',
            },
            maxWidth: '228px',
            lineHeight: '19.734px',
            letterSpacing: '0px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {truncateText(product.name, 25)}
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          {product.age && renderEdad}
        </Box>
      </Box>
      <Box
        component={Typography}
        sx={{
          borderRadius: '5px',
          height: '24px',
          padding: '0 10px',
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          fontSize: '12px',
          fontFamily: subtitleFont,
          backgroundColor: '#1D518B',
          width: 'max-content',
        }}
      >
        {product.infoTag}
      </Box>
      <Typography
        sx={{
          fontFamily: subtitleFont,
          color: '#808A94',
          fontSize: '12px',
          minHeight: '76px',
          maxWidth: '95%',
        }}
      >
        {truncateDescription(product.description, 175)}
      </Typography>

      <Button
        variant="contained"
        sx={{
          height: '28px',
          borderRadius: '20px',
          fontSize: '12px',
          textTransform: 'none',
          '&.MuiButton-contained': {
            backgroundColor: '#ADB7BF',
          },
        }}
        onClick={handleOpenDialog}
        disabled={disabled}
      >
        Ver más +
      </Button>

      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          flexDirection: {
            xs: 'column',
            lg: 'row',
          },
        }}
      >
        <Box sx={{ width: { xs: '100%', lg: '40%' } }}>
          <PersonSelector product={product} disabled={disabled} />
        </Box>
        <Box sx={{ width: { xs: '100%', lg: '100%' }, display: 'flex', justifyContent: 'end' }}>
          <ButtonMichinWrapper
            fullWidth
            setOpenDialog={setOpenDialog}
            openDialog={openDialog}
            product={product}
            disabled={disabled}
            icon="/assets/icons/tickets/ic-car.svg"
          />
        </Box>
      </Box>
      <DialogTicket
        open={openDialog}
        handleClose={handleCloseDialog}
        product={product}
        setOpenDialog={setOpenDialog}
        openDialog={openDialog}
      />
    </Box>
  );

  if (loading) return <Skeleton variant="rectangular" height={300} />;

  return (
    <Box
      sx={{
        width: '100%',
        height: 'max-content',
        gap: '11.9px',
        backgroundImage: {
          xs: 'url(/assets/images/tickets/boletoMobile.png)',
          sm: 'url(/assets/images/tickets/boleto.png)',
        },
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        padding: '15px 22px 15px 22.3px',
        display: {
          xs: 'flex',
          sm: 'grid',
        },
        flexDirection: 'column',
        gridTemplateColumns: {
          xs: '1fr',
          sm: '0.6fr 1fr',
        },
        position: 'relative',
        opacity: disabled ? 0.7 : 1,
        pointerEvents: disabled ? 'none' : 'auto',
      }}
    >
      {renderImage()}
      {renderInfo()}
    </Box>
  );
};

export default TicketMichin;
