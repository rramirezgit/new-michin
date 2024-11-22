import type { FieldError } from 'react-hook-form';

import { toast } from 'sonner';
import { useState } from 'react';

import { Alert } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useCityStore } from 'src/store/useCityStore';
import { useTicketStore } from 'src/store/ticketsStore';

import type { FormData } from './checkout-payment-accordion';

export type DataOpenPaySubmit = {
  deviceSessionId: string;
  formPayment: FormData;
  openPayLoaded: boolean;
  setError: (field: keyof FormData, error: FieldError) => void;
};

const createToast = (message: string) => {
  toast.custom((t) => <Alert severity="error">{message}</Alert>, {
    duration: 10000,
    position: 'top-center',
  });
};

const getMessageError = (error: number) => {
  switch (error) {
    case 3001:
      return 'La tarjeta fue rechazada.';
    case 3002:
      return 'La tarjeta ha expirado.';
    case 3003:
      return 'La tarjeta no tiene fondos suficientes.';
    case 3004:
      return 'La tarjeta ha sido identificada como una tarjeta robada.';
    case 3005:
      return 'La tarjeta ha sido rechazada por el sistema antifraudes.';
    default:
      return 'Error al crear la reserva, intenta nuevamente.';
  }
};

const useOpenpay = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setOrderCheckout, orderCheckout, createOrder } = useTicketStore();
  const { city } = useCityStore();
  const router = useRouter();
  const onSuccess = async (response: any) => {
    setOrderCheckout({ ...orderCheckout, sourceId: response.data.id });
    createOrder({ ...orderCheckout, sourceId: response.data.id, store: city })
      .then((res) => {
        new Promise((resolve) => {
          router.push('/product/checkout/success');
          resolve(true);
        }).finally(() => {
          setLoading(false);
        });
      })
      .catch((error) => {
        setLoading(false);
        createToast(getMessageError(error?.response?.data?.response?.error?.error_code));
      });
  };

  const onError = (response: any) => {
    setLoading(false);
    console.error('Error al crear el token:', response);
    toast.error('Error al crear el token:', response);
    router.push('/tickets');
  };

  const onSubmit = ({
    formPayment,
    openPayLoaded,
    deviceSessionId,
    setError,
  }: DataOpenPaySubmit) => {
    setLoading(true);
    if (openPayLoaded && deviceSessionId) {
      try {
        const [month, year] = formPayment.expiryDate.split('/');

        if (!window.OpenPay.card.validateCardNumber(formPayment.cardNumber)) {
          setError('cardNumber', { type: 'manual', message: 'Número de tarjeta inválido.' });
          setLoading(false);
          return;
        }

        if (!window.OpenPay.card.validateCVC(formPayment.cvv, formPayment.cardNumber)) {
          setError('cvv', { type: 'manual', message: 'CVC inválido.' });
          setLoading(false);
          return;
        }

        if (!window.OpenPay.card.validateExpiry(month, year)) {
          setError('expiryDate', { type: 'manual', message: 'Fecha de expiración inválida.' });
          setLoading(false);
          return;
        }

        const cardData = {
          card_number: formPayment.cardNumber.replace(/\s+/g, ''),
          holder_name: formPayment.cardHolderName,
          expiration_year: year,
          expiration_month: month,
          cvv2: formPayment.cvv,
          device_session_id: deviceSessionId,
        };

        window.OpenPay.token.create(cardData, onSuccess, onError);
      } catch (error) {
        setLoading(false);
        console.log(error);
        toast.error('Error al crear el token:', error);
        toast.error('intententa con otra tarjeta');
      }
    } else {
      console.error('OpenPay no se ha cargado aún o device_session_id no está disponible.');
    }
  };

  return { onSubmit, loading };
};

export default useOpenpay;
