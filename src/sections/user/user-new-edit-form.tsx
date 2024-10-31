'use client';

import type { IUserItem } from 'src/types/user';

import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isValidPhoneNumber } from 'react-phone-number-input/input';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Alert, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import { fData } from 'src/utils/format-number';

// ----------------------------------------------------------------------
import { useUserStore } from 'src/store/UserStore';
import { useMediaStore } from 'src/store/mediaStore';

import { toast } from 'src/components/snackbar';
import ButtonMichin from 'src/components/btn-michin';
import { Form, Field, schemaHelper } from 'src/components/hook-form';

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  avatarUrl: schemaHelper.file({ message: { required_error: 'El avatar es requerido' } }),
  name: zod.string().min(1, { message: 'El nombre es requerido' }),
  email: zod
    .string()
    .min(1, { message: 'El email es requerido' })
    .email({ message: 'El email debe ser un email válido' }),
  phoneNumber: schemaHelper.phoneNumber({ isValidPhoneNumber }),
  country: schemaHelper.objectOrNull<string | null>({
    message: { required_error: 'El país es requerido' },
  }),
  city: zod.string().min(1, { message: 'La ciudad es requerida' }),
  zipCode: zod.string().min(1, { message: 'El código postal es requerido' }),
  state: zod.string().min(1, { message: 'El estado es requerido' }),
  address: zod.string().min(1, { message: 'La dirección es requerida' }),
});

// ----------------------------------------------------------------------

type Props = {
  currentUser?: IUserItem;
};

export function UserNewEditForm({ currentUser }: Props) {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const { uploadImage } = useMediaStore();

  const { user, updateUser, loading } = useUserStore();

  const defaultValues = useMemo(
    () => ({
      avatarUrl: user?.avatar || null,
      name: user?.name || '',
      email: user?.email || '',
      phoneNumber: user?.phone || '',
      country: user?.country || '',
      state: user?.state || '',
      city: user?.city || '',
      address: user?.address || '',
      zipCode: user?.zipCode || '',
    }),
    [user]
  );

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      let { avatarUrl } = data;
      if (typeof data.avatarUrl === 'string' && data.avatarUrl.startsWith('data:image')) {
        const avatarUrlUpload = await uploadImage(data.avatarUrl);
        avatarUrl = avatarUrlUpload;
        data.avatarUrl = avatarUrlUpload;
      }

      await updateUser({
        name: data.name,
        phone: data.phoneNumber,
        avatar: avatarUrl as string,
        address: data.address,
        country: data?.country || '',
        state: data?.state || '',
        city: data?.city || '',
        zipCode: data?.zipCode || '',
      });
      toast.custom((t) => <Alert severity="success">Actualizado correctamente</Alert>, {
        duration: 3000,
        position: 'bottom-left',
      });
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <Card
            sx={{ pt: 10, pb: 5, px: 3, backgroundColor: '#1B497C', backdropFilter: 'blur(30px)' }}
          >
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatarUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                    }}
                  >
                    Permitido *.jpeg, *.jpg, *.png, *.gif, *.webp, *.bmp
                    <br /> tamaño máximo de {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3, backgroundColor: '#1B497C' }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="name" label="Nombre" />
              <Field.Text name="email" label="Email" disabled />
              <Field.Phone name="phoneNumber" label="Teléfono" />

              <Field.CountrySelect
                fullWidth
                name="country"
                label="País"
                placeholder="Selecciona un país"
              />

              <Field.Text name="state" label="Estado" />
              <Field.Text name="city" label="Ciudad" />
              <Field.Text name="address" label="Dirección" />
              <Field.Text name="zipCode" label="Código postal" />
            </Box>

            <Stack alignItems="center" sx={{ mt: 3 }}>
              <ButtonMichin
                loading={loading}
                h={smUp ? 50 : 40}
                type="submit"
                color="common.darkBlue"
                icon="/assets/icons/tik.svg"
                InitialBgColor={theme.palette.secondary.main}
                hoverBgColor={theme.palette.primary.main}
                border="none"
                sx={{
                  fontSize: {
                    xs: '12px',
                    sm: '14px',
                  },
                }}
              >
                Guardar cambios
              </ButtonMichin>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
