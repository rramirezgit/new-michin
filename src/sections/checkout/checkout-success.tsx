/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';

import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { Footer } from 'src/layouts/main/footer';
import { useUserStore } from 'src/store/UserStore';
import { useTicketStore } from 'src/store/ticketsStore';
import { removeCheckoutStorage } from 'src/store/localStorage';

import ButtonMichin from 'src/components/btn-michin';

// ----------------------------------------------------------------------

export function CheckoutSuccess() {
  const router = useRouter();

  const { reload } = useTicketStore();

  const { user } = useUserStore();

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
            fontSize: '39.025px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '58.538px',
            letterSpacing: '0px',
          }}
        >
          ¡Gracias por tu compra!
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <img src="/assets/images/pez.svg" alt="success" />
        </Box>

        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'UPBOLTERS',
            textAlign: 'center',
            fontSize: '24px',
          }}
        >
          ¡Te enviaremos tu Ticket por correo!
        </Typography>

        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: 'Futura Md BT',
              textAlign: 'center',
              fontSize: '16px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '30px',
              maxWidth: '600px',
            }}
          >
            Una vez recibas tu Ticket, acércate a nuestro acuario para intercambiar tus accesos en
            taquilla el día y la hora que seleccionaste. ¡Listos para una aventura increíble!
          </Typography>
        </Box>
        {user && (
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
            <ButtonMichin
              w={250}
              h={45}
              icon="/assets/icons/home/ic-right.svg"
              onClick={() => {
                router.push('/user');
              }}
              color="common.darkBlue"
              InitialBgColor="common.white"
              border="none"
            >
              Ver todos los tickets
            </ButtonMichin>
          </Box>
        )}

        <Footer />
      </Container>
    </Box>
  );
}
