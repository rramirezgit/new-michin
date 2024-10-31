import type { Product } from 'src/store/ticketsStore';

import { useTicketStore } from 'src/store/ticketsStore';

export const useCheckout = () => {
  const { selectedTickets } = useTicketStore();

  const isAvailableSlots = ({ ticket }: { ticket: Product }) => {
    const availableSlots = selectedTickets.find(
      (ticketg) => ticketg.product?.sku === ticket.sku
    )?.availableSlots;

    const peopleQty =
      (selectedTickets.find((ticketg) => ticketg.product?.sku === ticket.sku)?.adultCount || 0) +
      (selectedTickets.find((ticketg) => ticketg.product?.sku === ticket.sku)?.childCount || 0);

    const noAvailableSlots = availableSlots && peopleQty > availableSlots;
    return noAvailableSlots;
  };

  return { isAvailableSlots };
};
