'use client';

import { z } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Link, Typography } from '@mui/material';

import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

export default function AccessLiveStream() {
  const SignUpSchema = z.object({
    email: z.string().email({ message: 'Debe ser un correo válido' }),
  });

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const {
    watch,
    reset,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <AuthCenteredLayout maxWidth="450px">
      <Box sx={{ p: 3, textAlign: 'center', borderRadius: '8px' }}>
        <Image alt="lock" src="/assets/illustrations/forgot-pass.svg" width={66} height={66} />
        <Typography
          sx={{
            fontFamily: 'Futura Hv BT',
            fontSize: '24px',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          ¿Olvidaste tu contraseña?
        </Typography>
        <Typography
          sx={{
            mb: 3,
            fontFamily: 'Futura Bk BT',
            fontSize: '16px',
          }}
        >
          Por favor, ingresa tu correo electrónico y te enviaremos un código de 6 dígitos para
          verificar cuenta.
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Field.Text name="email" label="Correo Electrónico" required />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            color="secondary"
            fullWidth
            sx={{
              height: '44px',
              color: 'common.darkBlue',
              mt: 2,
            }}
          >
            Crear una cuenta
          </LoadingButton>
        </Form>
        <Link
          href="/auth/login"
          sx={{
            display: 'block',
            mt: 3,
            color: 'white',
            fontFamily: 'Futura Md BT',
            fontSize: '14px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              width: 1,
              justifyContent: 'center',
            }}
          >
            <Iconify icon="icon-park-outline:left" />
            <Typography>Volver para iniciar sesión</Typography>
          </Box>
        </Link>
      </Box>
    </AuthCenteredLayout>
  );
}
