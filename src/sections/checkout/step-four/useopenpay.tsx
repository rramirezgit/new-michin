import type { FieldError } from 'react-hook-form';

import { toast } from 'sonner';
import { useState } from 'react';

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

const useOpenpay = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { setOrderCheckout, orderCheckout, createOrder } = useTicketStore();
  const { city } = useCityStore();
  const router = useRouter();
  const onSuccess = async (response: any) => {
    setOrderCheckout({ ...orderCheckout, sourceId: response.data.id });
    createOrder({ ...orderCheckout, sourceId: response.data.id, store: city })
      .then(() => {
        new Promise((resolve) => {
          router.push('/product/checkout/success');
          resolve(true);
        }).finally(() => {
          setLoading(false);
        });
      })
      .catch(() => {
        router.push('/tickets');
        setLoading(false);
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
      const [month, year] = formPayment.expiryDate.split('/');

      if (!window.OpenPay.card.validateCardNumber(formPayment.cardNumber)) {
        setError('cardNumber', { type: 'manual', message: 'Número de tarjeta inválido.' });
        return;
      }

      if (!window.OpenPay.card.validateCVC(formPayment.cvv, formPayment.cardNumber)) {
        setError('cvv', { type: 'manual', message: 'CVC inválido.' });
        return;
      }

      if (!window.OpenPay.card.validateExpiry(month, year)) {
        setError('expiryDate', { type: 'manual', message: 'Fecha de expiración inválida.' });
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
    } else {
      console.error('OpenPay no se ha cargado aún o device_session_id no está disponible.');
    }
  };

  return { onSubmit, loading };
};

export default useOpenpay;
