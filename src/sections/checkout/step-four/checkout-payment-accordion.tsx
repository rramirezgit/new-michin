/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from 'react';
import { useMask } from '@react-input/mask';

import { Box, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import FormStatus from '../util/succes-form';

export type FormData = {
  cardHolderName: string;
  cardNumber: string;
  expiryDate: string; // Formato MM/AA
  cvv: string;
};

interface Props {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  completed: boolean;
  name: string;
  qty: number;
  onChangeForms: (formData: FormData, errors: any) => void;
  openPayLoaded: boolean;
  deviceSessionId: string | null;
  setDeviceSessionId: any;
  setOpenPayLoaded: any;
  watch: any;
  errors: any;
  methods: any;
}

export default function CheckoutPaymentAccordion({
  name,
  expanded,
  onChange,
  completed,
  qty = 1,
  onChangeForms,
  openPayLoaded,
  deviceSessionId,
  setDeviceSessionId,
  setOpenPayLoaded,
  watch,
  methods,
  errors,
}: Props) {
  useEffect(() => {
    const subscription = watch((value: any) => {
      onChangeForms(value as FormData, errors);
    });
    return () => subscription.unsubscribe();
  }, [watch, errors, onChangeForms]);

  const inputRef = useMask({ mask: '____ ____ ____ ____', replacement: '_' });
  const expiryDateRef = useMask({ mask: '__/__', replacement: '_' });
  const cvvRef = useMask({ mask: '____', replacement: '_' });

  const handleScriptLoad = () => {
    if (window?.OpenPay) {
      console.log('OpenPay is available.');
      window.OpenPay.setId(process.env.NEXT_PUBLIC_OPENPAY_ID || '');
      window.OpenPay.setApiKey(process.env.NEXT_PUBLIC_OPENPAY_API_KEY || '');
      window.OpenPay.setSandboxMode(true);
      setOpenPayLoaded(true);
    } else {
      console.error('OpenPay is not available.');
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://js.openpay.mx/openpay.v1.min.js';
    document.head.appendChild(script);
    script.onload = handleScriptLoad;

    const scriptDa = document.createElement('script');
    scriptDa.src = 'https://js.openpay.mx/openpay-data.v1.min.js';
    document.head.appendChild(scriptDa);
    scriptDa.onload = () => {
      if (window?.OpenPay) {
        console.log('OpenPay-data is available.');
        const sessionId = window.OpenPay.deviceData.setup('paymentForm', 'deviceIdHiddenFieldName');
        setDeviceSessionId(sessionId);
      } else {
        console.error('Error: OpenPay is not available.');
      }
    };

    return () => {
      const scriptd = document.querySelector(
        'script[src="https://js.openpay.mx/openpay.v1.min.js"]'
      );
      if (scriptd) {
        script.remove();
      }

      const scriptData = document.querySelector(
        'script[src="https://js.openpay.mx/openpay-data.v1.min.js"]'
      );
      if (scriptData) {
        scriptData.remove();
      }
    };
  }, []);

  return (
    <Accordion
      sx={{ mb: 2, '& .MuiAccordion-region': { backgroundColor: '#F4F6F8' } }}
      expanded={expanded}
      onChange={onChange}
    >
      <AccordionSummary
        expandIcon={<Iconify icon="ic:baseline-expand-more" />}
        sx={{
          backgroundColor: '#F4F6F8',
          borderRadius: expanded ? '16px 16px 0px 0px' : '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography
            sx={{
              color: 'common.darkerBlue',
              fontFamily: 'Futura Md BT',
              fontSize: { xs: 14, md: 16 },
              fontWeight: 400,
            }}
          >
            Información de{' '}
            <Typography
              component="span"
              sx={{
                position: 'relative',
                top: 1,
                color: 'common.darkerBlue',
                fontFamily: 'Futura-Bold',
                fontSize: { xs: 14, md: 16 },
                fontWeight: 500,
              }}
            >
              {name}
            </Typography>
          </Typography>
          <Box sx={{ ml: 'auto', mr: 2.5 }}>
            <FormStatus status={completed ? 'success' : 'error'} />
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          backgroundColor: '#FFF',
          border: '1.4px dashed rgba(145, 158, 171, 0.20)',
          borderRadius: '16px',
          p: { xs: 2, sm: '19px 30px' },
          boxShadow:
            '0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            gap: { xs: 1, md: 10 },
            mb: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          <Box>
            <Typography sx={{ color: '#1D518B', fontFamily: 'Futura Md BT', fontSize: 14 }}>
              Tarjetas de crédito
            </Typography>
            <Box sx={{ display: 'flex', gap: '0px' }}>
              <img src="/assets/icons/pay/Visa.svg" alt="Visa" style={{ height: 52, width: 52 }} />
              <img
                src="/assets/icons/pay/Mastercard.svg"
                alt="MasterCard"
                style={{ height: 50, width: 50 }}
              />
              <img src="/assets/icons/pay/Amex.svg" alt="Ixe" style={{ height: 50, width: 50 }} />
            </Box>
          </Box>
          <Box>
            <Typography sx={{ color: '#1D518B', fontFamily: 'Futura Md BT', fontSize: 14, mb: 1 }}>
              Tarjetas de débito
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <img
                src="/assets/icons/pay/Citibanamex_logo.svg"
                alt="Banamex"
                style={{ height: 25, width: 108 }}
              />
              <img
                src="/assets/icons/pay/cl_santander.svg"
                alt="Santander"
                style={{ height: 25, width: 93 }}
              />
              <img
                src="/assets/icons/pay/HSBC_logo.svg"
                alt="HSBC"
                style={{ height: 25, width: 67 }}
              />
              <img
                src="/assets/icons/pay/cl_scotiabank.svg"
                alt="Scotiabank"
                style={{ height: 25, width: 81 }}
              />
              <img
                src="/assets/icons/pay/Logo_de_Inbursa.svg"
                alt="Inbursa"
                style={{ height: 25, width: 77 }}
              />
            </Box>
          </Box>
        </Box>

        <Form id="paymentForm" methods={methods}>
          <input type="hidden" name="deviceIdHiddenFieldName" value={deviceSessionId || ''} />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Field.Text
              name="cardHolderName"
              label="Nombre del titular"
              required
              colorInput="common.darkBlue"
              error={!!errors.cardHolderName}
              helperText={errors.cardHolderName?.message}
            />
            <Field.Text
              name="cardNumber"
              label="Número de tarjeta"
              inputRef={inputRef}
              placeholder="0000 0000 0000 0000"
              required
              colorInput="common.darkBlue"
              error={!!errors.cardNumber}
              helperText={errors.cardNumber?.message}
            />

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Field.Text
                name="expiryDate"
                label="Expira (MM/AA)"
                placeholder="MM/AA"
                inputRef={expiryDateRef}
                required
                colorInput="common.darkBlue"
                error={!!errors.expiryDate}
                helperText={errors.expiryDate?.message}
              />
              <Field.Text
                name="cvv"
                label="CVV"
                inputRef={cvvRef}
                required
                colorInput="common.darkBlue"
                error={!!errors.cvv}
                helperText={errors.cvv?.message}
              />
            </Box>
          </Box>
        </Form>
      </AccordionDetails>
    </Accordion>
  );
}
