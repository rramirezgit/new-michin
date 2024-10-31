'use client';

import { z } from 'zod';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { useAuth0 } from '@auth0/auth0-react';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import { Box, Link, IconButton, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { setStorage } from 'src/hooks/use-local-storage';

import useAuthStore from 'src/store/AuthStore';
import { useUserStore } from 'src/store/UserStore';
import { AuthCenteredLayout } from 'src/layouts/auth-centered';

import { Form, Field } from 'src/components/hook-form';

export default function SignUpScreen() {
  const { signup } = useAuthStore();
  const { loginWithPopup, getAccessTokenSilently } = useAuth0();

  const router = useRouter();
  const SignUpSchema = z.object({
    firstName: z.string().min(1, { message: 'El nombre es requerido' }),
    phone: z.string().min(1, { message: 'El teléfono es requerido' }), // Añadir validación para teléfono
    email: z.string().email({ message: 'Debe ser un correo válido' }),
    password: z
      .string()
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
      .regex(/[a-z]/, { message: 'La contraseña debe contener al menos una letra minúscula' })
      .regex(/[A-Z]/, { message: 'La contraseña debe contener al menos una letra mayúscula' })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, {
        message: 'La contraseña debe contener al menos un carácter especial',
      }),
    country: z.string().min(1, { message: 'El país es requerido' }),
    state: z.string().min(1, { message: 'El estado es requerido' }),
    address: z.string().min(1, { message: 'La dirección es requerida' }),
    zipCode: z.string().min(1, { message: 'El código postal es requerido' }),
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

  const { fetchUser } = useUserStore();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await signup({
        name: data.firstName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        address: data.address,
        zipCode: data.zipCode,
        country: data.country,
        state: data.state,
        city: data.city,
      });

      await fetchUser();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  });

  const handleSocialLogin = async (platform: string) => {
    try {
      await loginWithPopup({
        authorizationParams: {
          login_hint: platform,
        },
      });
      const accessToken: any = await getAccessTokenSilently();
      setStorage('ASDFGHJKL', accessToken || '');
      await fetchUser();
      router.push('/');
    } catch (errord) {
      console.log(errord);
    }
  };

  return (
    <AuthCenteredLayout maxWidth="760px">
      <Box sx={{ p: 0, textAlign: 'center' }}>
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: 'Futura Hv BT',
            fontSize: '28px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '27.981px',
            mb: 1,
          }}
        >
          Regístrate
        </Typography>
        <Typography
          sx={{
            mb: 2,
            fontFamily: 'Futura Bk BT',
            fontSize: '14px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '20.52px',
          }}
        >
          ¿Ya tienes una cuenta?{' '}
          <Link href="/auth/login" color="secondary">
            Iniciar sesión
          </Link>
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 2,
            }}
          >
            <Field.Text name="firstName" label="Nombre" required />
            <Field.CountrySelect name="country" label="País" />
            <Field.Phone name="phone" label="Teléfono" required />
            <Field.Text name="state" label="Estado" />
            <Field.Text name="address" label="Dirección" />
            <Field.Text name="zipCode" label="Código Postal" />
            <Field.Text name="email" label="Correo Electrónico" required />
            <Field.Password name="password" label="Contraseña" required />
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
            Crear una cuenta
          </LoadingButton>
        </Form>
        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          Al registrarme, acepto los <Link href="#">términos de uso</Link> y la{' '}
          <Link href="#">política de privacidad</Link>.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          OR
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <IconButton
              sx={{ p: 0, position: 'relative', top: '1px' }}
              onClick={() => handleSocialLogin('google  ')}
            >
              <Image
                alt="google"
                src="/assets/icons/socials/ic-google.svg"
                width={28}
                height={28}
              />
            </IconButton>

            <IconButton
              sx={{ p: 0, position: 'relative', top: '-1px' }}
              onClick={() => handleSocialLogin('apple')}
            >
              <Image alt="apple" src="/assets/icons/socials/ic-apple.svg" width={30} height={30} />
            </IconButton>
            <IconButton
              sx={{ p: 0, position: 'relative', top: '2px' }}
              onClick={() => handleSocialLogin('twitter')}
            >
              <Image alt="x" src="/assets/icons/socials/ic-x-color.svg" width={30} height={30} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </AuthCenteredLayout>
  );
}
