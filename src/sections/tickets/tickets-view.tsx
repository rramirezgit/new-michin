/* eslint-disable @typescript-eslint/consistent-type-imports */

'use client';

import React from 'react';

import Stack from '@mui/material/Stack';
import { Container } from '@mui/material'; // Importa el componente Alert
import type { City } from 'src/store/useCityStore';

import { Footer } from 'src/layouts/main/footer';
import { useCityStore, STORAGE_KEY_CITY } from 'src/store/useCityStore';
import { Product, SelectedTicket, useTicketStore } from 'src/store/ticketsStore';

import { MotionViewport } from 'src/components/animate';

import TicketsList from './tickets-list';
import TicketsFilters from './tickets-filters';
import TitleSeccion from '../home/michin/TitleSeccion';
import { MInview } from '../home/michin/HomeHero/index';

export function TicketsView() {
  const options = [
    { value: 'accesos', label: 'Accesos', icon: '/assets/icons/tickets/ic-ticket-white.svg' },
    {
      value: 'actividades',
      label: 'Actividades e Interacciones',
      icon: '/assets/icons/tickets/ic-actividades.svg',
    },
  ];
  const { products, fetchProducts, selectedTickets, activeFilter, setActiveFilter } =
    useTicketStore();
  const { city, setCity } = useCityStore();

  React.useEffect(() => {
    const cityStorage = localStorage.getItem(STORAGE_KEY_CITY);
    if (cityStorage) {
      setCity(cityStorage as City);
    }
    fetchProducts();
  }, [fetchProducts, city, setCity]);

  const isAnyPersonSelected = selectedTickets.some(
    (ticket: SelectedTicket) => (ticket?.adultCount || 0) + (ticket?.childCount || 0) > 0
  );

  const filteredProducts = products.filter((product: Product) =>
    activeFilter === 'actividades' ? !product.access : product.access
  );

  return (
    <MotionViewport>
      <Stack
        sx={{
          position: 'relative',
          borderColor: 'none',
          mt: 'calc(var(--layout-header-desktop-height) * -1)',
          backgroundImage: 'url(/assets/background/michin/bg-agua.png)',
          paddingTop: 'calc(var(--layout-header-desktop-height) * 1)',
          backgroundSize: 'cover',
        }}
      >
        <MInview
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <TitleSeccion
            textAlign="center"
            title="Compra tus accesos"
            description="Adquiere tus boletos y accede a las actividades más inolvidables "
          />
        </MInview>

        <Container maxWidth="lg">
          <TicketsFilters
            options={options}
            activeFilter={activeFilter as 'actividades' | 'accesos'}
            setActiveFilter={setActiveFilter}
            buttonWidth={320}
            buttonHeight={60}
          />

          <TicketsList
            filteredProducts={filteredProducts}
            activeFilter={activeFilter}
            isAnyPersonSelected={isAnyPersonSelected}
            selectedTickets={selectedTickets}
          />
        </Container>
        <Footer />
      </Stack>
    </MotionViewport>
  );
}
