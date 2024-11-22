'use client';

import { z } from 'zod';
import Image from 'next/image';
import { useState } from 'react';
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

export default function LoginScreen() {
  const { loginWithPopup, getAccessTokenSilently } = useAuth0();
  const { postLoginRedirectPath } = useAuthStore();
  const { login } = useAuthStore();
  const { fetchUser } = useUserStore();
  const [error, setError] = useState('');
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  const router = useRouter();
  const LoginSchema = z.object({
    email: z.string().email({ message: 'Debe ser un correo válido' }),
    password: z.string().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
  });

  const methods = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
      await fetchUser();
      router.push(postLoginRedirectPath || '/');
    } catch (errorr) {
      setError(errorr.response.data.message);
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
    <AuthCenteredLayout maxWidth="450px">
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
          Iniciar sesión
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
          ¿No tienes una cuenta?{' '}
          <Link href="/auth/sign-up" color="secondary">
            Regístrate
          </Link>
        </Typography>
        <Form methods={methods} onSubmit={onSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Field.Text name="email" label="Email" required colorInput="white" />
            <Field.Password name="password" label="Contraseña" required colorInput="white" />
          </Box>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Typography sx={{ color: 'red' }}>{error}</Typography>
          </Box>
          <Box sx={{ mt: 1, mb: 1 }}>
            <Link
              href="/auth/forgot-password"
              sx={{
                mb: 3,
                color: 'white',
                fontFamily: 'Futura Md BT',
                fontSize: '13px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '32px',
              }}
            >
              ¿Olvidaste tu contraseña?
            </Link>
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
            }}
          >
            Iniciar sesión
          </LoadingButton>
        </Form>
        <Typography variant="body2" sx={{ mt: 2, mb: 2 }}>
          OR
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton
            sx={{ p: 0, position: 'relative', top: '1px' }}
            onClick={() => handleSocialLogin('google  ')}
          >
            <Image alt="google" src="/assets/icons/socials/ic-google.svg" width={28} height={28} />
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
    </AuthCenteredLayout>
  );
}
