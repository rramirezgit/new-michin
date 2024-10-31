import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';

import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

import { RouterLink } from 'src/routes/components';

import { pxToRem } from 'src/theme/styles';
import { buttonFont } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))({
  backgroundColor: 'transparent !important',
  boxShadow: 'none !important',
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&::before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    padding: '0px !important',
  },
  '& .MuiAccordionDetails-root': {
    paddingTop: '0px !important',
    paddingBottom: '25px !important',
  },
});

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<Iconify icon="iconamoon:arrow-right-2-duotone" />} {...props} />
))({
  boxShadow: 'none !important',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
});

const AccordionDetails = styled(MuiAccordionDetails)({
  borderTop: 'none',
});

export default function AccordionMenuMobile({
  panels,
}: {
  panels: { id: string; header: string; content: { label: string; path: string }[] }[];
}) {
  const [expanded, setExpanded] = React.useState<string | false>('');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      {panels.map(({ id, header, content }) => (
        <Accordion key={id} expanded={expanded === id} onChange={handleChange(id)}>
          <AccordionSummary aria-controls={`${id}d-content`} id={`${id}d-header`}>
            <Typography
              sx={{
                fontFamily: buttonFont,
                fontSize: pxToRem(20),
                fontWeight: 400,
              }}
            >
              {header}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {content.map((item) => (
              <Typography
                key={item.path}
                component={RouterLink}
                href={item.path}
                sx={{
                  fontFamily: buttonFont,
                  position: 'relative',
                  fontSize: pxToRem(15),
                  color: 'common.white',
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  mt: 2,
                  gap: pxToRem(5), // Improved alignment for the icon
                }}
              >
                {item.label}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
