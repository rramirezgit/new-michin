/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import Image from 'next/image';
import { useEffect } from 'react';

import Container from '@mui/material/Container';
import { Box, Button, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Footer } from 'src/layouts/main/footer';
import { useTicketStore } from 'src/store/ticketsStore';
import { removeCheckoutStorage } from 'src/store/localStorage';

// ----------------------------------------------------------------------

export function CheckoutTimeOut() {
  const router = useRouter();

  const { reload } = useTicketStore();

  useEffect(() => {
    reload();
    removeCheckoutStorage();
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        borderColor: 'none',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        backgroundImage: 'url(/assets/background/michin/bg-agua.png)',
        paddingTop: 'calc(var(--layout-header-desktop-height) * 1)',
        backgroundSize: 'cover',
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          mb: 10,
          mt: '100px',
          minHeight: 'calc(100vh - var(--layout-header-desktop-height) * 2)',
        }}
      >
        <Typography
          sx={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'UPBOLTERS',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '30px',
            letterSpacing: '0px',
          }}
        >
          !ups!
        </Typography>

        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'Futura Md BT',
            textAlign: 'center',
            fontSize: '16px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '30px',
          }}
        >
          Tiempo para completar tu reserva
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: {
              xs: '50px',
              sm: '25px',
            },
          }}
        >
          <Button
            variant="michin"
            onClick={() => {
              router.push('/tickets');
            }}
            startIcon={
              <Image
                src="/assets/icons/home/ic-down.svg"
                width={31}
                height={31}
                alt="icon"
                style={{
                  rotate: '90deg',
                }}
              />
            }
          >
            volver a la tienda
          </Button>
        </Box>

        <Footer />
      </Container>
    </Box>
  );
}
