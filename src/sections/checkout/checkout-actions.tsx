/* eslint-disable perfectionist/sort-imports */
import {
  Box,
  Alert,
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
import { useState } from 'react';

import type { OrderCheckout, TReserverData } from 'src/store/ticketsStore';
import { useTicketStore } from 'src/store/ticketsStore';

import { Iconify } from 'src/components/iconify';
import ButtonMichin from 'src/components/btn-michin';
import { useRouter } from 'src/routes/hooks';
import { toast } from 'src/components/snackbar';
import dayjs from 'dayjs';
import { SplashScreen } from 'src/components/loading-screen';
import type { DataOpenPaySubmit } from './step-four/useopenpay';
import useOpenpay from './step-four/useopenpay';
import type { FormData } from './step-three/checkout-form-accordion';
import type { FormDataTitular } from './step-three/checkout-form-accordion-titular';

interface CheckoutActionsProps {
  completed: boolean;
  dataOpenPaySubmit?: DataOpenPaySubmit;
  dataPersons?: {
    adults: FormData['persons'];
    children: FormData['persons'];
    titular: FormDataTitular;
    reglamentoAccepted: boolean;
    termsAccepted: boolean;
    privacyAccepted: boolean;
  };
}

export function CheckoutActions({
  completed,
  dataOpenPaySubmit,
  dataPersons,
}: CheckoutActionsProps) {
  const {
    setActiveStep,
    checkout,
    setAttendees,
    createReserve,
    selectedTickets,
    setCustumerData,
    setAllTerms,
    dateSelected,
  } = useTicketStore();

  const { onSubmit, loading: loadingOpenPay } = useOpenpay();

  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);

  const handleContinue = async () => {
    if (checkout.activeStep === 0) {
      setActiveStep({ activeStep: checkout.activeStep + 1, completed: false });
    } else if (checkout.activeStep === 1) {
      try {
        const reserverData: TReserverData[] = selectedTickets.map((ticket) => ({
          availabilityId: ticket?.availabilityId || '',
          quantity: (ticket?.adultCount || 0) + (ticket?.childCount || 0),
          sku: ticket?.product?.sku || '',
        }));
        await createReserve(reserverData, dayjs(dateSelected).format('YYYY-MM-DD'));
        setActiveStep({ activeStep: checkout.activeStep + 1, completed: false });
        // setOrderCheckout({ ...orderCheckout, eventDate: dayjs(dateSelected).format('YYYY-MM-DD') });
      } catch (error) {
        selectedTickets.find(
          (ticket) =>
            ticket.availableSlots &&
            ticket.availableSlots < (ticket?.adultCount || 0) + (ticket?.childCount || 0)
        );
        toast.custom(
          (t) => <Alert severity="error">Un ticket no tiene lugares disponibles</Alert>,
          {
            position: 'bottom-left',
          }
        );
      }
    } else if (checkout.activeStep === 2) {
      const attendeesAdult: OrderCheckout['attendees'] = dataPersons?.adults.map((form) => ({
        birthDate: dayjs(form.birthday).format('YYYY-MM-DD'),
        name: `${form.name} ${form.lastName}`,
        kind: 'ADULT',
      }));

      const attendeesChild: OrderCheckout['attendees'] = dataPersons?.children.map((form) => ({
        birthDate: dayjs(form.birthday).format('YYYY-MM-DD'),
        name: `${form.name} ${form.lastName}`,
        kind: 'CHILD',
      }));

      const attendees = [...(attendeesAdult || []), ...(attendeesChild || [])];

      setAttendees(attendees);

      setCustumerData({
        name: dataPersons?.titular.name,
        lastName: dataPersons?.titular.lastName,
        phone: dataPersons?.titular.phone,
        zipCode: dataPersons?.titular.zipCode,
        birthDate: dataPersons?.titular.birthday,
        emergencyContactName: dataPersons?.titular.emergencyContact,
        emergencyContactPhone: dataPersons?.titular.emergencyPhone,
      });

      setActiveStep({ activeStep: checkout.activeStep + 1, completed: false });
      setAllTerms({
        noticeOfPrivacy: dataPersons?.privacyAccepted || false,
        regulation: dataPersons?.reglamentoAccepted || false,
        responsive: dataPersons?.termsAccepted || false,
      });
    } else if (checkout.activeStep === 3) {
      if (dataOpenPaySubmit) {
        onSubmit(dataOpenPaySubmit);
      }
    }
  };

  const handleBack = () => {
    if (checkout.activeStep === 2) {
      setOpenDialog(true);
    } else {
      setActiveStep({ activeStep: checkout.activeStep - 1, completed: false });
    }
  };

  const handleCloseDialog = (confirm: boolean) => {
    setOpenDialog(false);
    if (confirm) {
      setActiveStep({ activeStep: checkout.activeStep - 1, completed: false });
    }
  };

  if (loadingOpenPay) {
    return <SplashScreen />;
  }

  return (
    <>
      <Box
        display="flex"
        gap={2}
        justifyContent="space-between"
        sx={{
          flexDirection: 'row',
          mt: 2,
        }}
      >
        {/* Back button */}
        {checkout.activeStep !== 0 && (
          <Button
            size="small"
            color="inherit"
            onClick={handleBack}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Volver
          </Button>
        )}
        {checkout.activeStep === 0 && (
          <Button
            size="small"
            color="inherit"
            onClick={() => router.push('/tickets')}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
          >
            Continuar Comprando
          </Button>
        )}
        <ButtonMichin
          disabled={!completed}
          InitialBgColor={completed ? '#FFCE07' : 'rgba(0, 0, 0, 0.05)'}
          hoverBgColor="#2DCDFF"
          onClick={handleContinue}
          border="none"
          w="30%"
          sx={{
            flexDirection: { xs: 'column', md: 'row' },
          }}
        >
          {checkout.activeStep === 3 ? 'Pagar' : 'Continuar'}
        </ButtonMichin>
      </Box>

      {/* Dialog */}
      <Dialog open={openDialog} onClose={() => handleCloseDialog(false)}>
        <DialogTitle color="black">Advertencia</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Si decides retroceder, perderás los boletos que has reservado. ¿Estás seguro de volver y
            perder la reserva?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleCloseDialog(true)}
            color="primary"
            autoFocus
            variant="contained"
          >
            Aceptar
          </Button>
          <Button onClick={() => handleCloseDialog(false)} color="primary" variant="outlined">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
