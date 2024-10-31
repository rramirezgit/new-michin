import type { AccordionProps } from '@mui/material/Accordion';
import type { AccordionSummaryProps } from '@mui/material/AccordionSummary';

import * as React from 'react';

import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';

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
});

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary expandIcon={<Iconify icon="iconamoon:arrow-right-2-duotone" />} {...props} />
))({
  boxShadow: 'none !important',
  borderBottom: '1px solid transparent',
  borderImage: 'url(/assets/icons/home/ic-line.svg) 20% round',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
});

const AccordionDetails = styled(MuiAccordionDetails)({
  borderTop: 'none',
});

export default function AccordionMenuFaqs({
  panels,
}: {
  panels: { id: string; header: string; content: string }[];
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
            <Typography>{header}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{content}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
}
