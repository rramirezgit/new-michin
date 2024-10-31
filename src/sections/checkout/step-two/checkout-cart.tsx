import type { Product } from 'src/store/ticketsStore';

import { useState } from 'react';

import { Card } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { useResponsive } from 'src/hooks/use-responsive';

import { useTicketStore } from 'src/store/ticketsStore';

import { useCheckout } from '../util/useChekout';
import HeaderSection from './checkout-cart-header';
import { CheckoutSummary } from '../checkout-summary';
import { CheckoutActions } from '../checkout-actions';
import TicketAccordion from './checkout-cart-accordion';

// ----------------------------------------------------------------------

export function CheckoutCart() {
  const { selectedTickets, dateSelected } = useTicketStore();

  const smUp = useResponsive('up', 'sm');

  const [expandedTicketId, setExpandedTicketId] = useState<string | null>(null);

  const handleAccordionChange =
    (ticketId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedTicketId(isExpanded ? ticketId : null);
    };

  const showCalendarId =
    selectedTickets.find((ticket) => ticket?.product?.access === true)?.product?.id ||
    selectedTickets[0]?.product?.id;

  const { isAvailableSlots } = useCheckout();

  const completed = (ticket: Product): boolean => {
    const ticketSelected = selectedTickets.find((ticketd) => ticketd.product?.sku === ticket.sku);
    if (ticketSelected) {
      const dateTime = ticketSelected?.time !== undefined && dateSelected !== undefined;

      const noAvailableSlots = isAvailableSlots({ ticket });

      const availableSlots = ticketSelected?.availableSlots;

      return dateTime && !noAvailableSlots && availableSlots !== 0;
    }
    return false;
  };

  const completedAll: boolean = selectedTickets.every((ticket) =>
    completed(ticket?.product as Product)
  );

  const accessTime = selectedTickets?.find((ticketg) => ticketg.product?.access)?.time;

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8.6}>
        <Card sx={{ mb: 3, px: { xs: 2, md: 3.5 }, py: { xs: 1.5, md: 2.5 } }}>
          <HeaderSection
            title="Fecha y Horario"
            description="Selecciona la fecha y el horario que quieres ingresar al acuario"
          />
          {selectedTickets.map((ticket) => (
            <TicketAccordion
              key={ticket?.product?.id}
              showCalendar={showCalendarId === ticket?.product?.id}
              ticket={ticket?.product as Product}
              accessTime={accessTime}
              expanded={expandedTicketId === ticket?.product?.id}
              onChange={handleAccordionChange(ticket?.product?.id || '')}
              completed={completed(ticket?.product as Product)}
            />
          ))}
          <CheckoutActions completed={completedAll} />
        </Card>
      </Grid>

      <Grid xs={12} md={3.4}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
}
