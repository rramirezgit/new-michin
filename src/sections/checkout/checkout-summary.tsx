import dayjs from 'dayjs';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { fCurrency } from 'src/utils/format-number';

import { useTicketStore } from 'src/store/ticketsStore';

// ----------------------------------------------------------------------

export function CheckoutSummary() {
  const { selectedTickets, totalPrice, dateSelected } = useTicketStore();

  return (
    <Card
      sx={{
        mb: 3,
        boxShadow: 3,
        borderRadius: '16px',
        backgroundColor: 'white',
        position: { xs: 'static', md: 'sticky' },
        top: { xs: 0, md: 70 },
      }}
    >
      <Stack spacing={2} sx={{ p: 2 }}>
        {selectedTickets.map((ticket) => (
          <Box
            display="flex"
            alignItems="center"
            key={ticket.product?.id}
            sx={{
              borderRadius: '12px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
              padding: '5px 10px',
              backgroundColor: 'white',
            }}
          >
            <img
              src={ticket.product?.image}
              alt={ticket.product?.name}
              style={{ width: 80, height: 80, marginRight: 16, borderRadius: 8 }}
            />
            <Box>
              <Typography
                sx={{
                  color: '#2B2B2B',
                  fontFamily: 'Futura Bk BT',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '20px',
                }}
              >
                {ticket.product?.name}
              </Typography>
              <Typography
                sx={{
                  mt: 1,
                  color: '#000',
                  fontFamily: 'Futura Hv BT',
                  fontSize: '18px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                {fCurrency(ticket.product?.price)}
              </Typography>
              {ticket.time && dateSelected && (
                <Box display="flex" gap={1} mt={1} sx={{ flexWrap: 'wrap' }}>
                  {ticket.product?.access && (
                    <Box
                      display="flex"
                      gap={1}
                      sx={{
                        borderRadius: '25px',
                        background: 'rgba(145, 158, 171, 0.10)',
                        padding: '5px 10px',
                        alignItems: 'center',
                      }}
                    >
                      <img src="/assets/icons/tickets/ic-calendar.svg" alt="calendar" />
                      <Typography
                        sx={{
                          color: '#1E2B62',
                          fontFamily: 'Futura Md BT',
                          fontSize: '12px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '20px',
                        }}
                      >
                        {dayjs(dateSelected).format('DD/MM/YYYY')}
                      </Typography>
                    </Box>
                  )}
                  {ticket.time && (
                    <Box
                      display="flex"
                      gap={1}
                      sx={{
                        borderRadius: '25px',
                        background: 'rgba(145, 158, 171, 0.10)',
                        padding: '5px 10px',
                        alignItems: 'center',
                      }}
                    >
                      <img src="/assets/icons/tickets/ic-reloj.svg" alt="reloj" />
                      <Typography
                        sx={{
                          color: '#1E2B62',
                          fontFamily: 'Futura Md BT',
                          fontSize: '12px',
                          fontStyle: 'normal',
                          fontWeight: '400',
                          lineHeight: '20px',
                        }}
                      >
                        {ticket.time}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}
            </Box>
          </Box>
        ))}

        <Box
          sx={{
            borderRadius: '12px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
            padding: '5px 10px',
            backgroundColor: 'white',
          }}
        >
          <Typography
            sx={{
              color: '#919EAB',
              fontFamily: 'Futura Bk BT',
              fontSize: { xs: 14, md: 13.9 },
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: 'normal',
            }}
          >
            Detalles de pago
          </Typography>

          <Divider sx={{ borderStyle: 'solid', my: 2 }} />

          {selectedTickets.map((ticket) => (
            <Box
              display="flex"
              justifyContent="space-between"
              key={ticket.product?.id}
              sx={{ mb: 1 }}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  component="span"
                  sx={{
                    color: '#919EAB',
                    fontFamily: 'Futura Bk BT',
                    fontSize: '13.939px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                  }}
                >
                  x{(ticket?.adultCount || 0) + (ticket?.childCount || 0)}
                </Typography>
                <Typography
                  component="span"
                  sx={{
                    color: '#919EAB',
                    fontFamily: 'Futura Bk BT',
                    fontSize: '13.939px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    textTransform: 'uppercase',
                  }}
                >
                  {ticket.product?.name}
                </Typography>
              </Box>

              <Typography
                component="span"
                sx={{
                  color: '#919EAB',
                  fontFamily: 'Futura Bk BT',
                  fontSize: '13.939px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: 'normal',
                }}
              >
                {fCurrency(
                  (ticket.product?.price || 0) *
                    ((ticket?.adultCount || 0) + (ticket?.childCount || 0))
                )}
              </Typography>
            </Box>
          ))}

          <Divider sx={{ borderStyle: 'solid', my: 2 }} />

          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography
              sx={{
                color: '#696969',
                fontFamily: 'Futura Hv BT',
                fontSize: '13.939px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
              }}
            >
              Total
            </Typography>
            <Typography
              sx={{
                color: '#696969',
                fontFamily: 'Futura Hv BT',
                fontSize: '13.939px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: 'normal',
              }}
            >
              {fCurrency(totalPrice)}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
