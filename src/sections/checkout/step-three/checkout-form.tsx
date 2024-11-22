/* eslint-disable react-hooks/exhaustive-deps */
import type { FieldErrors } from 'react-hook-form';
import type { typeCity } from 'src/layouts/main/footer';

import { useState, useEffect } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  Link,
  Checkbox,
  FormGroup,
  Typography,
  CardContent,
  FormControlLabel,
} from '@mui/material';

import { paths, getFullPath } from 'src/routes/paths';

import { getStorage, setStorage } from 'src/hooks/use-local-storage';

import { useCityStore } from 'src/store/useCityStore';
import { useTicketStore } from 'src/store/ticketsStore';
import { KeysLocalStorage } from 'src/store/localStorage';

import FormStatus from '../util/succes-form';
import HeaderSection from './checkout-form-header';
import Reglamento from './checkout-form-reglameto';
import { CheckoutSummary } from '../checkout-summary';
import { CheckoutActions } from '../checkout-actions';
import CheckoutFormAccordion from './checkout-form-accordion';
import CheckoutFormAccordionTitular from './checkout-form-accordion-titular';

import type { FormData } from './checkout-form-accordion';

// ----------------------------------------------------------------------

export function CheckoutForm() {
  const { maxAdultCount, maxChildCount } = useTicketStore();

  const { city } = useCityStore();
  const [expandedTicketId, setExpandedTicketId] = useState<number | null>(null);
  const [holder, setHolder] = useState<any>(null);

  const [completedFromChild, setCompletedFromChild] = useState<boolean>(false);
  const [completedFromAdult, setCompletedFromAdult] = useState<boolean>(false);
  const [completedFromTitular, setCompletedFromTitular] = useState<boolean>(false);
  const handleAccordionChange =
    (index: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedTicketId(isExpanded ? index : null);
    };

  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [privacyAccepted, setPrivacyAccepted] = useState<boolean>(false);
  const [reglamentoAccepted, setReglamentoAccepted] = useState<boolean>(false);

  const formDataAdultLocal = getStorage(KeysLocalStorage.checkoutFormAdult) || {};
  const [formDataAdult, setFormDataAdult] = useState<FormData | null>(formDataAdultLocal);

  const formDataChildLocal = getStorage(KeysLocalStorage.checkoutFormChild) || {};
  const [formDataChild, setFormDataChild] = useState<FormData | null>(formDataChildLocal);

  const formDataTitularLocal = getStorage(KeysLocalStorage.checkoutFormTitular) || {};
  const [formDataTitular, setFormDataTitular] = useState<any | null>(formDataTitularLocal);

  const completedAll: boolean =
    (maxAdultCount > 0 ? completedFromAdult : true) &&
    (maxChildCount > 0 ? completedFromChild : true) &&
    completedFromTitular &&
    termsAccepted &&
    privacyAccepted &&
    reglamentoAccepted;

  const handleFormsChangeAdult = (formData: FormData) => {
    const holderSelected = formData.persons.find((form) => form.isBuyer);
    setHolder(holderSelected);

    setFormDataAdult(formData);
    setStorage(KeysLocalStorage.checkoutFormAdult, formData);
  };

  const handleFormsChangeChild = (formData: FormData) => {
    setFormDataChild(formData);
    setStorage(KeysLocalStorage.checkoutFormChild, formData);
  };

  useEffect(() => {
    const isCompleted =
      formDataAdult?.persons?.every(
        (form) => form?.birthday !== '' && form?.name !== '' && form?.lastName !== ''
      ) || false;
    setCompletedFromAdult(isCompleted || false);

    if (!formDataTitular || Object.keys(formDataTitular).length === 0) {
      const holderSelected = formDataAdult?.persons?.find((form) => form.isBuyer) || null;
      setHolder(holderSelected);
    }
  }, [formDataAdult]);

  useEffect(() => {
    const isCompleted =
      formDataChild?.persons?.every(
        (form) => form?.birthday !== '' && form?.name !== '' && form?.lastName !== ''
      ) || false;
    setCompletedFromChild(isCompleted || false);
  }, [formDataChild]);

  useEffect(() => {
    if (formDataTitular && Object.keys(formDataTitular).length > 0) {
      const errors = getStorage(KeysLocalStorage.checkoutFormTitularErrors) || '{}';
      const isCompleted =
        formDataTitular.birthday &&
        formDataTitular.birthday !== '' &&
        formDataTitular.name &&
        formDataTitular.name !== '' &&
        formDataTitular.lastName &&
        formDataTitular.lastName !== '' &&
        formDataTitular.email &&
        formDataTitular.email !== '' &&
        formDataTitular.phone &&
        formDataTitular.phone !== '' &&
        formDataTitular.zipCode &&
        formDataTitular.zipCode !== '' &&
        formDataTitular.emergencyContact &&
        formDataTitular.emergencyContact !== '' &&
        formDataTitular.emergencyPhone &&
        formDataTitular.emergencyPhone !== '' &&
        Object.keys(errors).length === 0;
      setCompletedFromTitular(isCompleted || false);
    }
  }, [formDataTitular]);

  const handleScrollToReglamento = () => {
    const reglamentoElement = document.getElementById('reglamento');
    if (reglamentoElement) {
      reglamentoElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleFormsChangeTitular = (formData: any, errors: FieldErrors<FormData>) => {
    setFormDataTitular(formData);
    setStorage(KeysLocalStorage.checkoutFormTitular, formData);
    setStorage(KeysLocalStorage.checkoutFormTitularErrors, errors);

    const isCompleted =
      formData.birthday &&
      formData.birthday !== '' &&
      formData.name &&
      formData.name !== '' &&
      formData.lastName &&
      formData.lastName !== '' &&
      formData.email &&
      formData.email !== '' &&
      formData.phone &&
      formData.phone !== '' &&
      formData.zipCode &&
      formData.zipCode !== '' &&
      formData.emergencyContact &&
      formData.emergencyContact !== '' &&
      formData.emergencyPhone &&
      formData.emergencyPhone !== '' &&
      Object.keys(errors).length === 0;
    setCompletedFromTitular(isCompleted);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid xs={12} md={8.6}>
        <Card sx={{ mb: 3, px: { xs: 2, md: 3.5 }, py: { xs: 1.5, md: 2.5 } }}>
          <HeaderSection
            title="Detalles de los asistentes"
            description="Completa la información requerida de cada boleto."
          />
          {maxAdultCount > 0 && (
            <CheckoutFormAccordion
              formData={formDataAdult}
              onChangeForms={handleFormsChangeAdult}
              name="Adultos"
              expanded={expandedTicketId === 0}
              onChange={handleAccordionChange(0)}
              completed={completedFromAdult}
              showBuyer
              qty={maxAdultCount}
            />
          )}
          {maxChildCount > 0 && (
            <CheckoutFormAccordion
              formData={formDataChild}
              onChangeForms={handleFormsChangeChild}
              name="Niños"
              expanded={expandedTicketId === 1}
              onChange={handleAccordionChange(1)}
              completed={completedFromChild}
              qty={maxChildCount}
            />
          )}
          <Reglamento id="reglamento" />

          <Card sx={{ my: 2 }}>
            <CardContent sx={{ position: 'relative' }}>
              <Box
                sx={{
                  ml: 'auto',
                  mr: 2.5,
                  position: 'absolute',
                  top: { xs: 65, md: 15 },
                  right: 28,
                }}
              >
                <FormStatus
                  status={
                    termsAccepted && privacyAccepted && reglamentoAccepted ? 'success' : 'error'
                  }
                />
              </Box>
              <Typography
                sx={{
                  color: '#222',
                  fontFamily: 'Futura Hv BT',
                  fontSize: '14px',
                  fontStyle: 'normal',
                  fontWeight: '400',
                  lineHeight: '32px',
                }}
              >
                He leído y aceptado los términos y condiciones{' '}
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                    />
                  }
                  label={
                    <Link
                      href={getFullPath(paths[city as typeCity].terminosCondiciones)}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        color: '#1E2B62',
                        fontFamily: 'Futura Md BT',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '32px',
                      }}
                    >
                      Responsiva
                    </Link>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={privacyAccepted}
                      onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    />
                  }
                  label={
                    <Link
                      href={getFullPath(paths[city as typeCity].avisoPrivacidad)}
                      target="_blank"
                      rel="noopener"
                      sx={{
                        color: '#1E2B62',
                        fontFamily: 'Futura Md BT',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '32px',
                      }}
                    >
                      Aviso de Privacidad
                    </Link>
                  }
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={reglamentoAccepted}
                      onChange={(e) => setReglamentoAccepted(e.target.checked)}
                    />
                  }
                  label={
                    <Link
                      component="button"
                      onClick={handleScrollToReglamento}
                      sx={{
                        color: '#1E2B62',
                        fontFamily: 'Futura Md BT',
                        fontSize: '14px',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        lineHeight: '32px',
                      }}
                    >
                      Reglamento
                    </Link>
                  }
                />
              </FormGroup>
            </CardContent>
          </Card>
          <CheckoutFormAccordionTitular
            formData={formDataTitular}
            holder={holder}
            onChangeForms={handleFormsChangeTitular}
            name="Titular"
            expanded={expandedTicketId === 2}
            onChange={handleAccordionChange(2)}
            completed={completedFromTitular}
          />
          <CheckoutActions
            completed={completedAll}
            dataPersons={{
              adults: formDataAdult?.persons || [],
              children: formDataChild?.persons || [],
              titular: formDataTitular || {},
              reglamentoAccepted,
              termsAccepted,
              privacyAccepted,
            }}
          />
        </Card>
      </Grid>

      <Grid xs={12} md={3.4}>
        <CheckoutSummary />
      </Grid>
    </Grid>
  );
}
