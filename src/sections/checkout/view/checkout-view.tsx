/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { Footer } from 'src/layouts/main/footer';
import { useTicketStore } from 'src/store/ticketsStore';

import { CheckoutSteps } from '../checkout-steps';
import { CountdownLayer } from './countdown-toast';
import { CheckoutQty } from '../step-one/checkout-qty';
import { CheckoutCart } from '../step-two/checkout-cart';
import { CheckoutForm } from '../step-three/checkout-form';
import { CheckoutPayment } from '../step-four/checkout-payment';
import { CheckoutOrderComplete } from '../checkout-order-complete';

// ----------------------------------------------------------------------

export const PRODUCT_CHECKOUT_STEPS = [
  'Cant Boletos',
  'Fecha y horario',
  'Datos del Boleto',
  'Pago',
];

export function CheckoutView() {
  const router = useRouter();
  const { checkout, setActiveStep, selectedTickets } = useTicketStore();

  useEffect(() => {
    setActiveStep({ activeStep: 0, completed: false });
  }, []);

  useEffect(() => {
    if (selectedTickets.length === 0) {
      router.push('/tickets');
    }
  }, [selectedTickets]);

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
        }}
      >
        <Typography
          sx={{
            my: { xs: 3, md: 5 },
            width: '100%',
            textAlign: 'center',
            fontFamily: 'UPBOLTERS',
            fontSize: '28px',
          }}
        >
          Mi Carrito
        </Typography>

        <Grid container justifyContent={checkout.completed ? 'center' : 'flex-start'}>
          <Grid xs={12} md={12}>
            <CheckoutSteps activeStep={checkout.activeStep} steps={PRODUCT_CHECKOUT_STEPS} />
          </Grid>
        </Grid>

        <>
          {checkout.activeStep === 0 && <CheckoutQty />}

          {checkout.activeStep === 1 && <CheckoutCart />}

          {checkout.activeStep === 2 && <CheckoutForm />}

          {checkout.activeStep === 3 && <CheckoutPayment />}

          {checkout.completed && (
            <CheckoutOrderComplete open onReset={() => {}} onDownloadPDF={() => {}} />
          )}
        </>
        <Footer />
      </Container>

      {/* Mover CountdownLayer fuera del flujo condicional */}
      <CountdownLayer duration={10 * 60} step={2} activeStep={checkout.activeStep} />
    </Box>
  );
}
