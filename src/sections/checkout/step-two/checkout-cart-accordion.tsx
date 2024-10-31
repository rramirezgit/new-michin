import dayjs from 'dayjs';

import { DateCalendar } from '@mui/x-date-pickers';
import { Box, Accordion, Typography, AccordionSummary, AccordionDetails } from '@mui/material';

import { type Product, useTicketStore } from 'src/store/ticketsStore';

// Importa SunIcon según tu estructura de archivos
import { Iconify } from 'src/components/iconify';

import FormStatus from '../util/succes-form';
import TimeSelection from './checkout-cart-time-selection';

interface Props {
  ticket: Product;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  showCalendar: boolean;
  completed: boolean;
  accessTime?: string | undefined;
}

export default function TicketAccordion({
  ticket,
  expanded,
  onChange,
  showCalendar,
  completed,
  accessTime,
}: Props) {
  const { setSelectedTickets, selectedTickets, setDateSelected, dateSelected } = useTicketStore();

  const initialDate: any = dateSelected || dayjs().add(1, 'day');

  const handleDateChange = (newValue: any) => {
    if (newValue) {
      setDateSelected(newValue);
    }
  };

  const handleTimeClick = ({
    time,
    availableSlots,
    availabilityId,
    sku,
  }: {
    time: string;
    availableSlots: number;
    availabilityId: string;
    sku: string;
  }) => {
    const updateTicket = selectedTickets.map((ticketUpdate) => {
      if (ticketUpdate.product?.sku === sku) {
        return { ...ticketUpdate, time, availabilityId, availableSlots };
      }
      return ticketUpdate;
    });
    setSelectedTickets(updateTicket);
  };

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
            Selecciona para{' '}
            <Typography
              component="span"
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
              {ticket?.name}
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
          p: 1.25,
          boxShadow:
            '0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
          {showCalendar && (
            <DateCalendar
              value={initialDate}
              views={['month', 'day']}
              onChange={handleDateChange}
              minDate={dayjs().add(1, 'day')}
              sx={{
                width: {
                  xs: '100%',
                  md: '50%',
                },
                boxShadow: '2.152px 2.152px 32.276px 0px rgba(0, 0, 0, 0.06)',
                borderRadius: '16px',
                color: '#000',
                '& .MuiDateCalendar-root': {
                  color: '#000',
                },
              }}
            />
          )}
          <TimeSelection onTimeClick={handleTimeClick} ticket={ticket} accessTime={accessTime} />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}
