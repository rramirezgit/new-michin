/* eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import type { FieldErrors } from 'react-hook-form';

/* eslint-disable react-hooks/rules-of-hooks */
import { z } from 'zod';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  Card,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

import FormStatus from '../util/succes-form';

export type FormDataTitular = {
  name: string;
  lastName: string;
  email: string;
  phone: string;
  zipCode: string;
  birthday: string;
  emergencyContact: string;
  emergencyPhone: string;
};

interface Props {
  formData: FormDataTitular | null;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  completed: boolean;
  name: string;
  holder: {
    name: string;
    lastName: string;
    birthday: string;
  };
  onChangeForms: (formData: FormDataTitular, errors: FieldErrors<FormData>) => void;
}

export default function CheckoutFormAccordionTitular({
  formData,
  holder,
  name,
  expanded,
  onChange,
  completed,
  onChangeForms,
}: Props) {
  const formSchema = z.object({
    name: z.string().min(1, { message: 'El nombre es requerido' }),
    lastName: z.string().min(1, { message: 'El apellido es requerido' }),
    email: z.string().email({ message: 'Correo electrónico inválido' }),
    phone: z.string().min(8, { message: 'El teléfono es requerido' }),
    zipCode: z.string().min(1, { message: 'El código postal es requerido' }),
    birthday: z.string().min(1, { message: 'La fecha de nacimiento es requerida' }),
    emergencyContact: z.string().min(1, { message: 'El contacto de emergencia es requerido' }),
    emergencyPhone: z.string().min(1, { message: 'El teléfono de emergencia es requerido' }),
  });

  const methods = useForm<FormDataTitular>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues:
      formData && Object.keys(formData).length > 0
        ? formData
        : {
            name: holder?.name || '',
            lastName: holder?.lastName || '',
            email: '',
            phone: '',
            zipCode: '',
            birthday: holder?.birthday || '',
            emergencyContact: '',
            emergencyPhone: '',
          },
  });

  // Actualiza los valores del formulario cuando 'holder' cambie
  useEffect(() => {
    methods.reset({
      name: holder?.name || methods.getValues('name'),
      lastName: holder?.lastName || methods.getValues('lastName'),
      birthday: holder?.birthday || methods.getValues('birthday'),
      email: methods.getValues('email'),
      phone: methods.getValues('phone'),
      zipCode: methods.getValues('zipCode'),
      emergencyContact: methods.getValues('emergencyContact'),
      emergencyPhone: methods.getValues('emergencyPhone'),
    });
  }, [holder]);

  const {
    watch,
    formState: { errors },
  } = methods;

  // Observa los cambios en los valores del formulario y llama a 'onChangeForms'
  useEffect(() => {
    const subscription = watch((value) => {
      onChangeForms(value as FormDataTitular, errors);
    });
    return () => subscription.unsubscribe();
  }, [watch, errors, onChangeForms]);

  return (
    <Accordion
      sx={{
        mb: 2,
        '& .MuiAccordion-region': {
          backgroundColor: '#F4F6F8',
        },
      }}
      expanded={expanded}
      onChange={onChange}
    >
      <AccordionSummary
        expandIcon={<Iconify icon="ic:baseline-expand-more" />}
        sx={{
          backgroundColor: '#F4F6F8',
          borderRadius: expanded ? '16px 16px 0px 0px' : '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
          <Typography
            sx={{
              color: 'common.darkerBlue',
              fontFamily: 'Futura Md BT',
              fontSize: {
                xs: 14,
                md: 16,
              },
              fontWeight: 400,
            }}
          >
            Boletos{' '}
            <Typography
              component="span"
              sx={{
                position: 'relative',
                top: 1,
                color: 'common.darkerBlue',
                fontFamily: 'Futura-Bold',
                fontSize: {
                  xs: 14,
                  md: 16,
                },
                fontWeight: 500,
              }}
            >
              {name}
            </Typography>
          </Typography>

          <Box sx={{ ml: 'auto', mr: 2.5 }}>
            <FormStatus status={completed ? 'success' : 'error'} />
          </Box>
        </Box>
      </AccordionSummary>

      <AccordionDetails
        sx={{
          backgroundColor: '#FFF',
          border: '1.4px dashed rgba(145, 158, 171, 0.20)',
          borderRadius: '16px',
          p: 1.25,
          boxShadow:
            '0px 0px 2px 0px rgba(145, 158, 171, 0.20), 0px 12px 24px -4px rgba(145, 158, 171, 0.12)',
        }}
      >
        <Card sx={{ p: 2, mb: 2 }}>
          <Form methods={methods}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <Field.Text
                  name="name"
                  label="Nombre"
                  required
                  colorInput="common.darkBlue"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
                <Field.Text
                  name="lastName"
                  label="Apellido"
                  required
                  colorInput="common.darkBlue"
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
              </Box>
              <Field.Text
                name="email"
                label="Correo electrónico"
                required
                colorInput="common.darkBlue"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
                <Field.Phone
                  name="phone"
                  label="Teléfono"
                  required
                  colorInput="common.darkBlue"
                  placeholder="Teléfono"
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                />
                <Field.Text
                  name="zipCode"
                  label="Código Postal"
                  required
                  colorInput="common.darkBlue"
                  error={!!errors.zipCode}
                  helperText={errors.zipCode?.message}
                />
              </Box>
              <Field.DatePicker
                name="birthday"
                label="Fecha de Nacimiento"
                colorInput="common.darkBlue"
                value={methods.getValues('birthday') ? dayjs(methods.getValues('birthday')) : null}
                onChange={(date) => methods.setValue('birthday', date ? date.toISOString() : '')}
              />
              <Field.Text
                name="emergencyContact"
                label="En caso de emergencias llamar a"
                required
                colorInput="common.darkBlue"
                error={!!errors.emergencyContact}
                helperText={errors.emergencyContact?.message}
              />
              <Field.Phone
                name="emergencyPhone"
                label="Teléfono de Emergencia"
                placeholder="Teléfono de emergencia"
                required
                colorInput="common.darkBlue"
                error={!!errors.emergencyPhone}
                helperText={errors.emergencyPhone?.message}
              />
            </Box>
          </Form>
        </Card>
      </AccordionDetails>
    </Accordion>
  );
}
