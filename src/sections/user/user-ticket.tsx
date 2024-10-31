/* eslint-disable @typescript-eslint/consistent-type-imports */

'use client';

// Importa el componente Alert

import React, { useState } from 'react';

import { Box } from '@mui/material';

import { useUserStore } from 'src/store/UserStore';
import { SelectedTicket, useTicketStore } from 'src/store/ticketsStore';

import TicketsListUser from '../tickets/tickets-list-user';
import TicketsFiltersUser from '../tickets/tickets-filters-user';

export function UserTicket() {
  const options = [
    {
      value: 'past',
      label: 'Pasados',
    },
    { value: 'future', label: 'Próximos' },
  ];
  const [activeFilter, setActiveFilter] = useState<'past' | 'future'>('past');
  const { products, selectedTickets } = useTicketStore();

  const { fetchTickets, tickets, loading, error, meta } = useUserStore();

  React.useEffect(() => {
    fetchTickets({
      ticketDateFilter: activeFilter,
      page: 1,
    });
  }, [fetchTickets, activeFilter]);

  const isAnyPersonSelected = selectedTickets.some(
    (ticket: SelectedTicket) => (ticket?.adultCount || 0) + (ticket?.childCount || 0) > 0
  );

  const filteredProducts = tickets;

  const handleReload = () => {
    fetchTickets({
      ticketDateFilter: activeFilter,
      page: 1,
    });
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchTickets({
      ticketDateFilter: activeFilter,
      page: value,
    });
  };

  return (
    <Box>
      <TicketsFiltersUser
        options={options}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        buttonWidth={320}
        buttonHeight={60}
      />

      <TicketsListUser
        filteredProducts={filteredProducts}
        activeFilter={activeFilter}
        isAnyPersonSelected={isAnyPersonSelected}
        selectedTickets={selectedTickets}
        handleReload={handleReload}
        loading={loading}
        page={meta?.currentPage || 1}
        rowsPerPage={meta?.perPage || 5}
        handleChangePage={handleChangePage}
        totalPages={meta?.lastPage || 1}
      />
    </Box>
  );
}
