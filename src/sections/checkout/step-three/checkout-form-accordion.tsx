/* eslint-disable perfectionist/sort-imports */
/* eslint-disable react-hooks/rules-of-hooks */
import { z } from 'zod';
import dayjs from 'dayjs';
import React, { useEffect } from 'react';
import type { FieldErrors } from 'react-hook-form';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Box,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
  Card,
  Checkbox,
  FormControlLabel,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Field, Form } from 'src/components/hook-form';

import FormStatus from '../util/succes-form';

export type FormData = {
  persons: {
    name: string;
    lastName: string;
    birthday: string;
    isBuyer?: boolean;
  }[];
};

interface Props {
  formData: FormData | null;
  expanded: boolean;
  onChange: (event: React.SyntheticEvent, isExpanded: boolean) => void;
  completed: boolean;
  name: string;
  qty: number;
  showBuyer?: boolean;
  onChangeForms: (formData: FormData, errors: FieldErrors<FormData>) => void;
}

export default function CheckoutFormAccordion({
  formData,
  name,
  expanded,
  onChange,
  completed,
  qty = 1,
  onChangeForms,
  showBuyer = false,
}: Props) {
  const formSchema = z.object({
    persons: z.array(
      z.object({
        name: z.string().min(1, { message: 'El nombre es requerido' }),
        lastName: z.string().min(1, { message: 'El apellido es requerido' }),
        birthday: z.string().min(1, { message: 'La fecha de nacimiento es requerida' }),
        isBuyer: z.boolean().optional(),
      })
    ),
  });

  const methods = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues:
      formData && Object.keys(formData).length > 0
        ? formData
        : {
            persons: Array.from({ length: qty }, () => ({
              name: '',
              lastName: '',
              birthday: '',
              isBuyer: false,
            })),
          },
  });

  const {
    control,
    watch,
    formState: { errors, isValid },
    setValue,
    getValues,
  } = methods;

  const { fields } = useFieldArray({
    control,
    name: 'persons',
  });

  // Observa los cambios en los valores del formulario y llama a 'onChangeForms'
  useEffect(() => {
    const subscription = watch((value) => {
      onChangeForms(value as FormData, errors);
    });
    return () => subscription.unsubscribe();
  }, [watch, errors, onChangeForms]);

  const handleCheckboxChange = (index: number, checked: boolean) => {
    const persons = getValues('persons');
    const updatedPersons = persons.map((person, i) => ({
      ...person,
      isBuyer: i === index ? checked : false,
    }));
    setValue('persons', updatedPersons);
  };

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
        <Form methods={methods}>
          {fields.map((field, index) => (
            <Card sx={{ p: 2, mb: 2 }} key={field.id}>
              <Box
                sx={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  mb: 3,
                }}
              >
                <Typography
                  sx={{
                    color: 'common.darkBlue',
                    fontFamily: 'Futura Hv BT',
                    fontSize: 16,
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '32px',
                  }}
                >
                  {name === 'Adultos' ? 'Adulto' : 'Niño'} {index + 1}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {showBuyer && (
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={getValues(`persons.${index}.isBuyer`) || false}
                          onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                        />
                      }
                      label="Titular de la Compra"
                      slotProps={{
                        typography: {
                          sx: {
                            color: '#222',
                            fontFamily: 'Futura Md BT',
                            fontSize: 14,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: '32px',
                          },
                        },
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', md: 'row' },
                  }}
                >
                  <Field.Text
                    name={`persons.${index}.name`}
                    label="Nombre"
                    required
                    colorInput="common.darkBlue"
                    error={!!errors.persons?.[index]?.name}
                    helperText={errors.persons?.[index]?.name?.message}
                  />
                  <Field.Text
                    name={`persons.${index}.lastName`}
                    label="Apellido"
                    required
                    colorInput="common.darkBlue"
                    error={!!errors.persons?.[index]?.lastName}
                    helperText={errors.persons?.[index]?.lastName?.message}
                  />
                </Box>
                <Field.DatePicker
                  name={`persons.${index}.birthday`}
                  label="Fecha de nacimiento"
                  colorInput="common.darkBlue"
                  value={
                    getValues(`persons.${index}.birthday`)
                      ? dayjs(getValues(`persons.${index}.birthday`))
                      : null
                  }
                  onChange={(date) =>
                    setValue(`persons.${index}.birthday`, date ? date.toISOString() : '')
                  }
                />
              </Box>
            </Card>
          ))}
        </Form>
      </AccordionDetails>
    </Accordion>
  );
}
