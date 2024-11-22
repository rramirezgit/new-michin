/* eslint-disable react-hooks/exhaustive-deps */
import type { typeCity } from 'src/layouts/main/footer';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Card, Link, Checkbox, FormGroup, Typography, FormControlLabel } from '@mui/material';

import { paths, getFullPath } from 'src/routes/paths';

import { useCityStore } from 'src/store/useCityStore';
import { useTicketStore } from 'src/store/ticketsStore';

import HeaderSection from './checkout-form-header';
import { CheckoutSummary } from '../checkout-summary';
import { CheckoutActions } from '../checkout-actions';
import CheckoutPaymentAccordion from './checkout-payment-accordion';
import CheckoutPaymentInfo from './checkout-form-accordion-titular';

import type { DataOpenPaySubmit } from './useopenpay';
import type { FormData } from './checkout-payment-accordion';

// ----------------------------------------------------------------------

export function CheckoutPayment() {
  const { maxAdultCount, setOrderCheckout, orderCheckout } = useTicketStore();
  const { city } = useCityStore();

  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);

  const [completedFromPayment, setCompletedFromPayment] = useState<boolean>(false);

  const [openPayLoaded, setOpenPayLoaded] = useState<boolean>(false);
  const [deviceSessionId, setDeviceSessionId] = useState<string | undefined>(undefined);

  const [dataOpenPaySubmit, setDataOpenPaySubmit] = useState<DataOpenPaySubmit | undefined>(
    undefined
  );

  const handleAccordionChange =
    (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedTicketId(isExpanded ? index : null);
    };

  useEffect(() => {
    if (deviceSessionId) {
      setOrderCheckout({ ...orderCheckout, deviceSessionId });
    }
  }, [deviceSessionId]);

  const [termsConditionsAccepted, setTermsConditionsAccepted] = useState<boolean>(false);

  const completedAll: boolean = completedFromPayment && termsConditionsAccepted;

  const formSchema = z.object({
    cardHolderName: z.string().min(1, { message: 'El nombre del titular es requerido' }),
    cardNumber: z.string().min(1, { message: 'El número de tarjeta es requerido' }),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
      message: 'Formato de fecha inválido (MM/AA)',
    }),
    cvv: z.string().min(3, { message: 'El CVV es requerido' }),
    // ... otros campos si es necesario ...
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      cardHolderName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      // ... otros valores por defecto ...
    },
  });

  const {
    watch,
    formState: { errors },
    setError, // Añadido para establecer errores manualmente
  } = methods;

  const handleChangeFormPayment = (formData: FormData) => {
    if (deviceSessionId && openPayLoaded) {
      setDataOpenPaySubmit({
        deviceSessionId,
        formPayment: formData,
        openPayLoaded,
        setError,
      });
      if (
        formData &&
        formData.cardHolderName &&
        formData.cardHolderName !== '' &&
        formData.cardNumber &&
        formData.cardNumber !== '' &&
        formData.expiryDate &&
        formData.expiryDate !== '' &&
        formData.cvv &&
        formData.cvv !== ''
      ) {
        setCompletedFromPayment(true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8.6}>
        <Card sx={{ mb: 3, px: { xs: 2, md: 3.5 }, py: { xs: 1.5, md: 2.5 } }}>
          <HeaderSection
            title="PROCESO DE PAGO"
            description="Ingresa tus datos para obtener los boletos."
          />
          <CheckoutPaymentAccordion
            watch={watch}
            errors={errors}
            methods={methods}
            openPayLoaded={openPayLoaded}
            deviceSessionId={deviceSessionId || null}
            setDeviceSessionId={setDeviceSessionId}
            setOpenPayLoaded={setOpenPayLoaded}
            onChangeForms={handleChangeFormPayment}
            name="Pago"
            expanded={expandedTicketId === 0}
            onChange={handleAccordionChange(0)}
            completed={completedFromPayment}
            qty={maxAdultCount}
          />
          <CheckoutPaymentInfo
            name="facturacion.cdmx@acuariomichin.com"
            expanded={expandedTicketId === 2}
            onChange={handleAccordionChange(2)}
          />

          <Box sx={{ my: 2, px: 3 }}>
            <Typography
              sx={{
                color: '#919EAB',
                fontFamily: 'Futura Md BT',
                fontSize: 14,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '26px',
                mb: 1,
              }}
            >
              Sus datos personales se utilizarán para procesar su pedido, respaldar su experiencia
              en este sitio web y para otros fines descritos en nuestro{' '}
              <Link
                href={getFullPath(paths[city as typeCity].avisoPrivacidad)}
                target="_blank"
                rel="noopener"
                sx={{
                  color: '#1D518B',
                  fontFamily: 'Futura Md BT',
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '26px',
                  textDecoration: 'underline',
                }}
              >
                políticas de privacidad
              </Link>
              .
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsConditionsAccepted}
                    onChange={(e) => setTermsConditionsAccepted(e.target.checked)}
                  />
                }
                label={
                  <Typography
                    sx={{
                      color: '#919EAB',
                      fontFamily: 'Futura Md BT',
                      fontSize: 14,
                      fontStyle: 'normal',
                      fontWeight: 400,
                      lineHeight: '26px',
                    }}
                  >
                    He leído y estoy de acuerdo con los{' '}
                    <Link
                      href={getFullPath(paths[city as typeCity].terminosCondiciones)}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        color: '#1D518B',
                        fontFamily: 'Futura Md BT',
                        fontSize: 14,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        lineHeight: '26px',
                        textDecoration: 'underline',
                      }}
                    >
                      términos y condiciones
                    </Link>{' '}
                    de la web
                  </Typography>
                }
              />
            </FormGroup>
          </Box>

          <CheckoutActions completed={completedAll} dataOpenPaySubmit={dataOpenPaySubmit} />
        </Card>
      </Grid>

      <Grid xs={12} md={3.4}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
}
