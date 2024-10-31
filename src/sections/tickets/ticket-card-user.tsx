import type { Breakpoint } from '@mui/material';
// Importa el tipo Product

import type { TicketUser } from 'src/store/UserStore';

import dayjs from 'dayjs';
import React, { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Skeleton, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { subtitleFont, limitedUseFont } from 'src/theme/core';

import { Logo } from 'src/components/logo';

import GeneratePDF from '../user/pdfOrder';

interface TicketMichinUserProps {
  product: TicketUser;
  disabled?: boolean | undefined;
}

const TicketMichinUser = ({ product, disabled = false }: TicketMichinUserProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const layoutQuery: Breakpoint = 'md';

  const access = product.orderItem.find((item) => item.productType === 'ACCESS');
  const interactions = product.orderItem.filter((item) => item.productType === 'INTERACTION');

  const statusColor = {
    PROCESSING: '#ADB7BF',
    FAILED: '#c90202',
    PAID: '#1d8b6f',
  };

  const statusText: Record<string, string> = {
    PROCESSING: 'Procesando pago',
    FAILED: 'Pago fallido',
    PAID: 'Pago exitoso',
  };
  const smUp = useResponsive('up', 'sm');
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#1E2B62',
        backgroundImage: ``,
        backgroundSize: 'cover',
        borderRadius: '15px',
        paddingBottom: {
          xs: '10px',
          md: '15px',
        },
      }}
    >
      <Box
        sx={{
          padding: {
            xs: '12px 12px 0px 12px',
            md: '18px 18px 0px 18px',
          },
          display: 'flex',
          gap: '10px',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Logo
          data-slot="logo"
          localidad="CDMX"
          width={theme.breakpoints.up(layoutQuery) ? 78.7 : 65}
          height={theme.breakpoints.up(layoutQuery) ? 22.9 : 18.9}
        />
        {access && (
          <Typography
            variant="h3"
            sx={{
              textAlign: 'center',
              textShadow: '0px 3.281px 3.281px rgba(0, 0, 0, 0.25)',
            }}
          >
            {truncateText(`${access?.quantity}x ACCESO ${access?.productName}`, 44)}
          </Typography>
        )}
      </Box>

      <Box
        sx={{
          background: 'url(/assets/icons/tickets/interaction.svg)',
          backgroundSize: '100% 50px',
          mt: 3,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: 50,
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            textShadow: '0px 3.281px 3.281px rgba(0, 0, 0, 0.25)',
            color: '#FFF',
            fontFamily: 'UPBOLTERS',
            position: 'relative',
            top: '-4px',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px',
          }}
        >
          x{interactions.length} INTERACCIONES
        </Typography>
      </Box>
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
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        gap: '3px',
        padding: '10px',
        fontSize: '11px',
      }}
    >
      <img src="/assets/icons/tickets/persons.svg" alt="persons" width={13} height={13} />

      <Typography
        sx={{
          fontFamily: limitedUseFont,
          fontSize: {
            xs: '12px',
            sm: '14px',
          },
          position: 'relative',
          top: '0px',
        }}
      >
        {product.childrenQty + product.adultsQty}
      </Typography>
    </Box>
  );

  const renderInfo = () => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: product.status === 'PAID' ? 'space-around' : 'flex-start',
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
          Detalle de tu visita
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          {renderEdad}
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '10px' }}>
        {product.adultsQty > 0 && (
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
            {product.adultsQty} {product.adultsQty > 1 ? 'Adultos' : 'Adulto'}
          </Box>
        )}
        {product.childrenQty > 0 && (
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
            {product.childrenQty} {product.childrenQty > 1 ? 'Niños' : 'Niño'}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          height: '28px',
          fontSize: '12px',
          width: 'max-content',
          display: 'flex',
          gap: '4px',
          borderRadius: '100px',
          border: '1px solid #1E2B62',
          padding: '0 10px',
          alignItems: 'center',
          textTransform: 'none',
        }}
      >
        <Box
          sx={{
            borderRadius: '100px',
            backgroundColor:
              product.status === 'PROCESSING'
                ? statusColor.PROCESSING
                : product.status === 'FAILED' ||
                    product.status === 'CHARGE_FAILED' ||
                    product.status === 'ERROR_CREATING_CHARGE'
                  ? statusColor.FAILED
                  : product.status === 'PAID'
                    ? statusColor.PAID
                    : statusColor.PROCESSING,
            width: '10px',
            height: '10px',
          }}
        />
        <Typography sx={{ color: '#1E2B62' }}>{statusText[product.status]}</Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: '8px',
          flexDirection: {
            xs: 'column',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <img src="/assets/icons/tickets/ic-calendar.svg" alt="calendar" width={16} height={16} />
          <Typography
            variant="body2"
            sx={{
              color: '#1E2B62',
              fontFamily: 'Futura Md BT',
              fontSize: '14px',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '20px',
            }}
          >
            {dayjs(product.eventDate).format('ddd DD  MMMM YYYY')}
          </Typography>
        </Box>
        {access && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <img src="/assets/icons/tickets/ic-reloj.svg" alt="clock" width={16} height={16} />
            <Typography
              variant="body2"
              sx={{
                color: '#1E2B62',
                fontFamily: 'Futura Md BT',
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '20px',
              }}
            >
              Ingreso {access?.startTime}
            </Typography>
          </Box>
        )}
      </Box>
      {product.status === 'PAID' && (
        <GeneratePDF
          ticketId={product.id}
          interactions={interactions}
          ingreso={access?.startTime || ''}
          totalPersons={product.childrenQty + product.adultsQty}
          adults={product.adultsQty}
          children={product.childrenQty}
          access={access}
        />
      )}
    </Box>
  );

  if (loading) return <Skeleton variant="rectangular" height={300} />;

  return (
    <Box
      sx={{
        width: '100%',
        height: 'max-content',
        minHeight: '250px',
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

export default TicketMichinUser;
