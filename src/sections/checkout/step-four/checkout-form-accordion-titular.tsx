/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';

import {
  Box,
  Alert,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';

export type FormData = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  birthday: string;
  emergencyContact: string;
  emergencyPhone: string;
};

interface Props {
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  name: string;
}

export default function CheckoutPaymentInfo({ name, expanded, onChange }: Props) {
  return (
    <Accordion
      sx={{
        mb: 2,
        '& .MuiAccordion-region': {
          backgroundColor: '#F4F6F8',
        },
      }}
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
              fontSize: {
                xs: 14,
                md: 16,
              },
              fontWeight: 400,
            }}
          >
            ¿Necesitas una factura? Solicita tu documento a{' '}
            <Typography
              component="a"
              href="mailto:facturacion.cdmx@acuariomichin.com"
              sx={{
                position: 'relative',
                top: 1,
                color: 'common.darkerBlue',
                fontFamily: 'Futura-Bold',
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                fontWeight: 500,
              }}
            >
              {name}
            </Typography>
          </Typography>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          backgroundColor: '#FFF',
          border: '1.4px dashed rgba(145, 158, 171, 0.20)',
          borderRadius: '16px',
          p: 1.25,
          pl: 2,
          boxShadow:
            '0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
        }}
      >
        <Typography
          component="div"
          sx={{
            color: '#231F20',
            fontFamily: 'Futura Bk BT',
            fontSize: 15,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '26px',
          }}
        >
          Enviando los siguientes datos:
          <ul
            style={{
              margin: 0,
              padding: 0,
              paddingLeft: 16,
              listStyleType: 'disc',
              listStylePosition: 'inside',
            }}
          >
            <li>Constancia de situación fiscal</li>
            <li>Fotografía o escaner del ticket</li>
            <li>Uso de CFDI</li>
            <li>Correo y número de contacto</li>
          </ul>
        </Typography>
        <Alert severity="info" sx={{ mt: 2 }}>
          Recuerda: Tienes 10 días a partir de la emisión del ticket para solicitar tu documento.
        </Alert>
      </AccordionDetails>
    </Accordion>
  );
}
