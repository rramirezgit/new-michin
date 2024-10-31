import type { Product, SelectedTicket } from 'src/store/ticketsStore';

import React from 'react';
import SvgVacio from '#/assets/icons/tickets/vacio.svg';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

import TicketMichin from './ticket-card';

interface TicketsListProps {
  filteredProducts: Product[];
  activeFilter: string;
  isAnyPersonSelected: boolean;
  selectedTickets: SelectedTicket[];
}

const TicketsList: React.FC<TicketsListProps> = ({
  filteredProducts,
  activeFilter,
  isAnyPersonSelected,
  selectedTickets,
}) => (
  <Box
    sx={{
      backgroundColor: 'rgba(30, 43, 98, 0.15)',
      borderRadius: '15px',
      marginTop: '30px',
      marginBottom: '118px',
      padding: '30px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '30px',
    }}
  >
    {filteredProducts.length > 0 ? (
      <>
        <Alert
          severity="info"
          sx={{
            backgroundColor: '#FFF',
            color: '#006C9C',
            '& .MuiAlert-icon': {
              color: '#006C9C',
            },
          }}
        >
          {activeFilter === 'actividades'
            ? 'Para poder entrar al acuario y disfrutar de toda la experiencia, necesitas comprar tu boleto de acceso.'
            : 'Solo se permite un tipo de acceso por compra. Revisa tu selección antes de proceder.'}
        </Alert>

        <Box
          sx={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: {
              sm: '1fr',
              md: '1fr 1fr',
            },
            gap: '30px',
          }}
        >
          {filteredProducts.map((product) => (
            <TicketMichin
              key={product.id}
              product={product}
              disabled={
                isAnyPersonSelected &&
                selectedTickets.some(
                  (ticket) =>
                    ticket.product?.id !== product.id &&
                    !!ticket.product?.access &&
                    !!product.access
                )
              }
            />
          ))}
        </Box>
      </>
    ) : (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '5px',
        }}
      >
        <SvgVacio />
        <Box
          sx={{
            color: '#FFF',
            fontFamily: 'UPBOLTERS',
            textAlign: 'center',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}
        >
          actualmente no hay actividades disponibles para la compra
        </Box>
        <Box
          sx={{
            color: '#FFF',
            textAlign: 'center',
            fontFamily: 'Futura Bk BT',
            fontSize: '20px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: 'normal',
          }}
        >
          ¡Mantente pendiente, pronto habrán nuevas experiencias para ti!
        </Box>
      </Box>
    )}
  </Box>
);

export default TicketsList;
