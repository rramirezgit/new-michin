/* eslint-disable react-hooks/exhaustive-deps */
import type { Product, SelectedTicket } from 'src/store/ticketsStore';

import { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  Table,
  Paper,
  Alert,
  Button,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  IconButton,
  TableContainer,
} from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { fCurrency } from 'src/utils/format-number';

import { useTicketStore } from 'src/store/ticketsStore';

import { Image } from 'src/components/image';
import Counter from 'src/components/counter';
import { toast } from 'src/components/snackbar';
import { SvgColor } from 'src/components/svg-color';

import { CheckoutActions } from '../checkout-actions';
import { CheckoutSummary } from '../checkout-summary';
import HeaderSection from '../step-two/checkout-cart-header';
// ----------------------------------------------------------------------

export function CheckoutQty() {
  const [temporaryTicket, setTemporaryTicket] = useState<SelectedTicket[]>([]);
  const [isUndoActive, setIsUndoActive] = useState(false);
  const { selectedTickets, setSelectedTickets, totalPrice } = useTicketStore();

  const smup = useResponsive('up', 'md');

  const tiketsSinPersonas = selectedTickets.some(
    (ticket) => ticket.adultCount === 0 && ticket.childCount === 0
  );

  type THandlePersonCountChange = ({
    adultCount,
    childCount,
    product,
  }: {
    adultCount?: number;
    childCount?: number;
    product: Product;
  }) => void;

  const handlePersonCountChange: THandlePersonCountChange = ({
    adultCount,
    childCount,
    product,
  }) => {
    if (Object.keys(product).length > 0) {
      const existingTicket = selectedTickets.find((ticket) => ticket.product?.id === product.id);

      const isRemovingTicket = adultCount === 0 && childCount === 0;

      if (existingTicket) {
        if (isRemovingTicket) {
          setSelectedTickets(selectedTickets.filter((ticket) => ticket.product?.id !== product.id));
        } else {
          if (adultCount !== undefined && adultCount > -1) {
            setSelectedTickets(
              selectedTickets.map((ticket) =>
                ticket.product?.id === product.id ? { ...ticket, adultCount } : ticket
              )
            );
          }
          if (childCount !== undefined && childCount > -1) {
            setSelectedTickets(
              selectedTickets.map((ticket) =>
                ticket.product?.id === product.id ? { ...ticket, childCount } : ticket
              )
            );
          }
        }
      } else if (!isRemovingTicket) {
        setSelectedTickets([...selectedTickets, { product, adultCount, childCount }]);
      }
    }
  };

  const handleRemoveTicket = (ticket: SelectedTicket) => {
    if (selectedTickets.length === 1) {
      toast.custom((t) => <Alert severity="error">No puedes eliminar todos los boletos.</Alert>, {
        position: 'bottom-left',
        duration: 3000,
      });
      return;
    }

    setSelectedTickets(
      selectedTickets.filter((ticketd) => ticketd.product?.id !== ticket.product?.id)
    );
    setTemporaryTicket([ticket, ...temporaryTicket]);
  };

  const deshacerTicket = ({ ticket }: { ticket: SelectedTicket }) => {
    setSelectedTickets([...selectedTickets, ticket]);
    setTemporaryTicket(
      temporaryTicket.filter(
        (temporaryTicketd) => temporaryTicketd.product?.id !== ticket.product?.id
      )
    );
  };

  const showDeshacer = ({ ticket }: { ticket: SelectedTicket }) => {
    setIsUndoActive(true);
    toast.custom(
      (t) => (
        <Alert
          severity="success"
          action={
            <Button
              color="success"
              size="small"
              variant="contained"
              onClick={() => {
                deshacerTicket({ ticket });
                toast.dismiss(t);
                setIsUndoActive(false);
              }}
            >
              Deshacer
            </Button>
          }
        >
          {smup ? `Has eliminado ${ticket.product?.name} de tu carrito.` : `Eliminste un boleto`}
        </Alert>
      ),
      {
        position: 'bottom-left',
        id: ticket.product?.id || '',
        duration: 3000,
      }
    );

    const isInTemporaryTicket = temporaryTicket.find(
      (temporaryTicketd) => temporaryTicketd.product?.id === ticket.product?.id
    );
    if (isInTemporaryTicket) {
      setTimeout(() => {
        const newTemporaryTicket = temporaryTicket.filter(
          (temporaryTicketd) => temporaryTicketd.product?.id !== ticket.product?.id
        );

        setTemporaryTicket(newTemporaryTicket);
      }, 3000);
    }

    setTimeout(() => {
      setIsUndoActive(false);
    }, 3000);
  };

  useEffect(() => {
    if (temporaryTicket.length > 0) {
      const isInSelectedTickets = selectedTickets.find(
        (ticket) => ticket.product?.id === temporaryTicket[0].product?.id
      );
      if (!isInSelectedTickets) {
        showDeshacer({ ticket: temporaryTicket[0] });
      }
    }
  }, [temporaryTicket]);

  const tableDesktop = (
    <Card sx={{ mb: 3, px: { xs: 2, md: 3.5 }, py: { xs: 1.5, md: 2.5 } }}>
      <HeaderSection
        title="Boletos"
        description="Elije la cantidad de boletos que quieres comprar"
      />

      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Boletos</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell align="center">Cantidad</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedTickets.map((ticket, index) => (
              <TableRow key={ticket.product?.id || index}>
                <TableCell>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}
                  >
                    <Image
                      src={ticket.product?.image || ''}
                      alt="product"
                      sx={{
                        width: '63px',
                        height: '63px',
                        borderRadius: '4px',
                      }}
                    />
                    <Typography
                      sx={{
                        overflow: 'hidden',
                        color: '#1C252E',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontFamily: 'Futura Md BT',
                        fontSize: 15,
                        fontWeight: 400,
                        lineHeight: '19.734px',
                        letterSpacing: '0px',
                      }}
                    >
                      {ticket.product?.name}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{fCurrency(ticket.product?.price || 0)}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '28px',
                      width: '100%',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography
                        sx={{
                          color: '#1C252E',
                          textAlign: 'center',
                          fontFamily: 'Futura Hv BT',
                          fontSize: 14,
                          lineHeight: '28px',
                          letterSpacing: '0px',
                        }}
                      >
                        Adultos
                      </Typography>
                      <Counter
                        error={ticket?.adultCount === 0 && ticket?.childCount === 0}
                        value={ticket?.adultCount || 0}
                        onChange={(value) => {
                          handlePersonCountChange({
                            adultCount: value,
                            product: ticket.product as Product,
                          });
                        }}
                      />
                      <Typography
                        sx={{
                          color: '#637381',
                          fontFamily: 'Futura Bk BT',
                          fontSize: 12,
                          lineHeight: '22px',
                          letterSpacing: '0px',
                        }}
                      >
                        Desde 18 años
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{
                          color: '#1C252E',
                          textAlign: 'center',
                          fontFamily: 'Futura Hv BT',
                          fontSize: 14,
                          lineHeight: '28px',
                          letterSpacing: '0px',
                        }}
                      >
                        Niños
                      </Typography>
                      <Counter
                        error={ticket?.childCount === 0 && ticket?.adultCount === 0}
                        value={ticket?.childCount || 0}
                        onChange={(value) => {
                          handlePersonCountChange({
                            childCount: value,
                            product: ticket.product as Product,
                          });
                        }}
                      />
                      <Typography
                        sx={{
                          color: '#637381',
                          fontFamily: 'Futura Bk BT',
                          fontSize: 12,
                          lineHeight: '22px',
                          letterSpacing: '0px',
                        }}
                      >
                        Desde 1 a 17 años
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  {fCurrency(
                    (ticket.product?.price || 0) *
                      ((ticket?.adultCount || 0) + (ticket?.childCount || 0))
                  )}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => handleRemoveTicket(ticket)}
                    disableFocusRipple
                    disableRipple
                    disabled={isUndoActive} // Deshabilitar el botón si "Deshacer" está activo
                  >
                    <SvgColor src="/assets/icons/tickets/ic-trash.svg" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          
            <TableRow>
              <TableCell colSpan={4}>
                <Typography
                  sx={{
                    overflow: 'hidden',
                    color: '#1C252E',
                    textOverflow: 'ellipsis',
                    fontFamily: 'Futura Md BT',
                    fontSize: 15,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '19.734px',
                    letterSpacing: '0px',
                  }}
                >
                  Precio total
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography
                  sx={{
                    color: '#1C252E',
                    fontFamily: 'Futura Hv BT',
                    fontSize: 14.352,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '22px',
                    letterSpacing: '0px',
                  }}
                >
                  {fCurrency(totalPrice)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {selectedTickets.some((ticket) => ticket.adultCount === 0 && ticket.childCount === 0) && (
          <Alert variant="outlined" severity="error">
            Para continuar con tu compra, las cantidades de adultos y niños no pueden ser 0.
          </Alert>
        )}
        {selectedTickets.every((ticket) => !ticket.product?.access) && (
          <Alert variant="outlined" severity="info">
            Recuerda que para ingresar al acuario y disfrutar de las interacciones debes tener si o
            si un acceso.
          </Alert>
        )}
        {selectedTickets.some(
          (ticket) =>
            (ticket?.childCount || 0) > 0 &&
            (ticket?.adultCount || 0) === 0 &&
            ticket.product?.access
        ) && (
          <Alert variant="outlined" severity="info">
            Recuerda que todos los niños deben ingresar con un adulto. ¡No olvides agregar tu acceso
            de adulto!
          </Alert>
        )}
      </Box>

      <CheckoutActions completed={!tiketsSinPersonas} />
    </Card>
  );

  const tableMobile = (
    <Card sx={{ mb: 3, px: 2, py: 1.5 }}>
      <HeaderSection
        title="Boletos"
        description="Elije la cantidad de boletos que quieres comprar"
      />
      <Box
        sx={{
          backgroundColor: '#F4F6F8',
          height: '65px',
          padding: '16px',
          borderRadius: '8px 8px 0px 0px',
        }}
      >
        <Typography
          sx={{
            color: '#1E2B62',
            fontFamily: 'Futura Md BT',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '24px',
          }}
        >
          Boletos
        </Typography>
      </Box>
      {selectedTickets.map((ticket, index) => (
        <Box
          key={ticket.product?.id || index}
          sx={{
            borderBottom: '2px dashed #E0E0E0',
            padding: '16px 0px',
            position: 'relative',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 0px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Image
                src={ticket.product?.image || ''}
                alt="product"
                sx={{
                  width: '51px',
                  height: '51px',
                  borderRadius: '4px',
                }}
              />
              <Typography
                sx={{
                  overflow: 'hidden',
                  color: '#1C252E',
                  fontFamily: 'Futura Md BT',
                  fontSize: 15,
                  fontWeight: 400,
                  lineHeight: '19.734px',
                  letterSpacing: '0px',
                  // elipsis
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  width: '185px',
                }}
              >
                {ticket.product?.name}
              </Typography>
            </Box>
            <Typography
              sx={{
                color: '#1C252E',
                textAlign: 'right',
                fontFamily: 'Futura Bk BT',
                fontSize: 15,
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: '22px',
                letterSpacing: '0px',
              }}
            >
              {fCurrency(ticket.product?.price || 0)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box
              sx={{
                display: 'flex',
                gap: '28px',
                width: '100%',
                justifyContent: 'start',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography
                  sx={{
                    color: '#1C252E',
                    textAlign: 'center',
                    fontFamily: 'Futura Hv BT',
                    fontSize: 14,
                    lineHeight: '28px',
                    letterSpacing: '0px',
                  }}
                >
                  Adultos
                </Typography>
                <Counter
                  error={ticket?.adultCount === 0 && ticket?.childCount === 0}
                  value={ticket?.adultCount || 0}
                  onChange={(value) => {
                    handlePersonCountChange({
                      adultCount: value,
                      product: ticket.product as Product,
                    });
                  }}
                />
                <Typography
                  sx={{
                    color: '#637381',
                    fontFamily: 'Futura Bk BT',
                    fontSize: 12,
                    lineHeight: '22px',
                    letterSpacing: '0px',
                  }}
                >
                  Desde 18 años
                </Typography>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: '#1C252E',
                    textAlign: 'center',
                    fontFamily: 'Futura Hv BT',
                    fontSize: 14,
                    lineHeight: '28px',
                    letterSpacing: '0px',
                  }}
                >
                  Niños
                </Typography>
                <Counter
                  error={ticket?.childCount === 0 && ticket?.adultCount === 0}
                  value={ticket?.childCount || 0}
                  onChange={(value) => {
                    handlePersonCountChange({
                      childCount: value,
                      product: ticket.product as Product,
                    });
                  }}
                />
                <Typography
                  sx={{
                    color: '#637381',
                    fontFamily: 'Futura Bk BT',
                    fontSize: 12,
                    lineHeight: '22px',
                    letterSpacing: '0px',
                  }}
                >
                  Desde 1 a 17 años
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography
                sx={{
                  color: '#1C252E',
                  textAlign: 'right',
                  fontFamily: 'Futura Hv BT',
                  fontSize: 16,
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '22px',
                  letterSpacing: '0px',
                }}
              >
                {fCurrency(
                  (ticket.product?.price || 0) *
                    ((ticket?.adultCount || 0) + (ticket?.childCount || 0))
                )}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ position: 'absolute', top: '80px', right: '2px' }}>
            <IconButton
              onClick={() => handleRemoveTicket(ticket)}
              disableFocusRipple
              disableRipple
              disabled={isUndoActive} // Deshabilitar el botón si "Deshacer" está activo
            >
              <SvgColor src="/assets/icons/tickets/ic-trash.svg" />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          marginTop: '16px',
          marginBottom: '16px',
        }}
      >
        {selectedTickets.some((ticket) => ticket.adultCount === 0 && ticket.childCount === 0) && (
          <Alert variant="outlined" severity="error">
            Para continuar con tu compra, las cantidades de adultos y niños no pueden ser 0.
          </Alert>
        )}
        {selectedTickets.every((ticket) => !ticket.product?.access) && (
          <Alert variant="outlined" severity="info">
            Recuerda que para ingresar al acuario y disfrutar de las interacciones debes tener si o
            si un acceso.
          </Alert>
        )}
        {selectedTickets.some(
          (ticket) =>
            (ticket?.childCount || 0) > 0 &&
            (ticket?.adultCount || 0) === 0 &&
            ticket.product?.access
        ) && (
          <Alert variant="outlined" severity="info">
            Recuerda que todos los niños deben ingresar con un adulto. ¡No olvides agregar tu acceso
            de adulto!
          </Alert>
        )}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          sx={{
            color: '#1C252E',
            fontFamily: 'Futura Md BT',
            fontSize: 15,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '19.734px',
            letterSpacing: '0px',
          }}
        >
          Precio total
        </Typography>
        <Typography
          sx={{
            color: '#1C252E',
            fontFamily: 'Futura Hv BT',
            fontSize: 16,
          }}
        >
          {fCurrency(totalPrice)}
        </Typography>
      </Box>
      <CheckoutActions completed={!tiketsSinPersonas} />
    </Card>
  );

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8}>
        {smup ? tableDesktop : tableMobile}
      </Grid>

      <Grid xs={12} md={4}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
}
