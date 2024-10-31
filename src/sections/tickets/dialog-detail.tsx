import React from 'react';

import { Alert, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';

import { Iconify } from 'src/components/iconify';

//
import IncludedItemsDisplay from './dialog-icludes';
import { subtitleFont } from '../../theme/core/typography';

const AccessDetails = ({ description, access }: { description: string; access: boolean }) => (
  <Accordion
    sx={{
      borderRadius: '8px',
      boxShadow: 'none',
      border: '1px solid #E1E8ED', // Gris claro
      '&.Mui-expanded': {
        margin: 0,
        backgroundColor: 'rgba(145, 158, 171, 0.05)', // Gris claro
      },
      '&.MuiAccordion-root:before': {
        display: 'none',
      },
    }}
  >
    <AccordionSummary
      expandIcon={<Iconify icon="ep:arrow-down-bold" color="#1D518B" width={17} height={17} />}
      aria-controls="access-details-content"
      id="access-details-header"
      sx={{
        padding: '12px 14px',
        '& .MuiAccordionSummary-content': {
          margin: '4px 0px',
        },
        '&.Mui-expanded': {
          minHeight: 0,
        },
        '& .MuiAccordionSummary-content.Mui-expanded': {
          margin: 0,
        },
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: '#637381',
          fontWeight: '500',
          fontFamily: { subtitleFont },
          fontSize: '14px',
        }}
      >
        Tu acceso incluye
      </Typography>
    </AccordionSummary>
    <AccordionDetails
      sx={{
        padding: '16px',
        backgroundColor: '#F9FAFB', // Gris claro
        borderTop: 'none', // Sin borde superior
        borderRadius: '0 0 8px 8px',
      }}
    >
      <IncludedItemsDisplay includedItems={description} />
      {!access && (
        <Alert
          severity="info"
          sx={{
            mt: '16px',
            backgroundColor: ' rgba(0, 184, 217, 0.08)',
            color: '#006C9C',
            '& .MuiAlert-icon': {
              color: '#006C9C',
            },
          }}
        >
          Para poder entrar al acuario y disfrutar de toda la experiencia, necesitas comprar tu
          boleto de acceso.
        </Alert>
      )}
    </AccordionDetails>
  </Accordion>
);

export default AccessDetails;
