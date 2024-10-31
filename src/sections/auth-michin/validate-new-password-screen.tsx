'use client';

import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Link, Alert, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import useAuthStore from 'src/store/AuthStore';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

export default function ValidateNewPasswordScreen({ id, email }: { id: string; email: string }) {
  const [error, setError] = useState('');
  const { validatePasswordChange } = useAuthStore();
  const router = useRouter();
  const SignUpSchema = z
    .object({
      password: z
        .string()
        .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
        .regex(/[A-Z]/, { message: 'La contraseña debe tener al menos una letra mayúscula' })
        .regex(/[0-9]/, { message: 'La contraseña debe tener al menos un número' })
        .regex(/[\W_]/, { message: 'La contraseña debe tener al menos un carácter especial' }),
      passwordConfirmation: z.string().min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres',
      }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
      message: 'Las contraseñas no coinciden',
      path: ['passwordConfirmation'],
    });

  const methods = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  const {
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await validatePasswordChange(id, email, data.password);
      toast.custom((t) => <Alert severity="success">Contraseña cambiada</Alert>, {
        duration: 5000,
        position: 'bottom-left',
      });
      router.push('/auth/login');
    } catch (err) {
      console.error(err);
      setError(err.response.data.message);
    }
  });

  return (
    <AuthCenteredLayout maxWidth="450px">
      <Box sx={{ p: 3, textAlign: 'center', borderRadius: '8px' }}>
        <Typography
          sx={{
            fontFamily: 'Futura Hv BT',
            fontSize: '24px',
            fontWeight: 'bold',
            mb: 2,
          }}
        >
          Ingresa tu nueva contraseña
        </Typography>

        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Field.Password name="password" label="Contraseña" required />
            <Field.Password name="passwordConfirmation" label="Confirmar contraseña" required />
          </Box>
          <Box sx={{ my: 1 }}>
            <Typography color="error">{error}</Typography>
          </Box>
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
            Cambiar contraseña
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
