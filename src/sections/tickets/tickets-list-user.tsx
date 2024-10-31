import type { TicketUser } from 'src/store/UserStore';
import type { SelectedTicket } from 'src/store/ticketsStore';

import React from 'react';
import SvgVacio from '#/assets/icons/tickets/vacio.svg';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme, Pagination } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import ButtonMichin from 'src/components/btn-michin';
import { LoadingScreen } from 'src/components/loading-screen';

import TicketMichinUser from './ticket-card-user';

interface TicketsListProps {
  filteredProducts: TicketUser[];
  activeFilter: string;
  isAnyPersonSelected: boolean;
  selectedTickets: SelectedTicket[];
  handleReload: () => void;
  loading: boolean;
  page: number;
  totalPages: number;
  rowsPerPage: number;
  handleChangePage: (event: React.ChangeEvent<unknown>, value: number) => void;
}

const TicketsListUser: React.FC<TicketsListProps> = ({
  filteredProducts,
  activeFilter,
  isAnyPersonSelected,
  selectedTickets,
  handleReload,
  loading,
  page,
  totalPages,
  rowsPerPage,
  handleChangePage,
}) => {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');

  return (
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
          {smUp && (
            <Alert
              severity="info"
              sx={{
                backgroundColor: '#FFF',
                color: '#006C9C',
                '& .MuiAlert-icon': {
                  color: '#006C9C',
                },
              }}
              action={
                <ButtonMichin
                  h={smUp ? 30 : 30}
                  wEndIcon={20}
                  hEndIcon={20}
                  endIcon="/assets/icons/tickets/ic-reload.svg"
                  type="submit"
                  onClick={handleReload}
                  color="common.darkBlue"
                  InitialBgColor={theme.palette.secondary.main}
                  hoverBgColor={theme.palette.primary.main}
                  border="none"
                  sx={{
                    fontSize: {
                      xs: '12px',
                      sm: '14px',
                    },
                  }}
                >
                  Recargar
                </ButtonMichin>
              }
            >
              Puedes recargar los tickets para ver actualizaciones en el estado de tus compras.
            </Alert>
          )}

          {!smUp && (
            <ButtonMichin
              h={smUp ? 30 : 30}
              wEndIcon={20}
              hEndIcon={20}
              endIcon="/assets/icons/tickets/ic-reload.svg"
              type="submit"
              onClick={handleReload}
              color="common.darkBlue"
              InitialBgColor={theme.palette.secondary.main}
              hoverBgColor={theme.palette.primary.main}
              border="none"
              sx={{
                fontSize: {
                  xs: '12px',
                  sm: '14px',
                },
              }}
            >
              Actualizar
            </ButtonMichin>
          )}

          {loading ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <LoadingScreen />
            </Box>
          ) : (
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
                <TicketMichinUser
                  key={product.id}
                  product={product}
                  disabled={product.status === 'PROCESSING'}
                />
              ))}
            </Box>
          )}
        </>
      ) : !loading ? (
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
            {activeFilter === 'past' ? 'No tienes tickets comprados' : 'No tienes tickets activos'}
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
            Ve a la tienda y elige la mejor aventura
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <LoadingScreen />
        </Box>
      )}

      <Pagination
        page={page}
        shape="rounded"
        count={totalPages}
        onChange={handleChangePage}
        sx={{ mx: 'auto' }}
      />
    </Box>
  );
};

export default TicketsListUser;
