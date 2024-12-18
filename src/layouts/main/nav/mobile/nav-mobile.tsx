import type { City } from 'src/store/useCityStore';

import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { Avatar, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';
import { paths, getFullPath } from 'src/routes/paths';
import { useRouter, usePathname } from 'src/routes/hooks';

import { pxToRem } from 'src/theme/styles';
import { buttonFont } from 'src/theme/core';
import useAuthStore from 'src/store/AuthStore';
import { useUserStore } from 'src/store/UserStore';
import { useCityStore } from 'src/store/useCityStore';

import { Scrollbar } from 'src/components/scrollbar';
import ButtonMichin from 'src/components/btn-michin';

import AccordionMenuMobile from './nav-mobile-accordions';
import { LocationSort } from '../desktop/nav-desktop-top-area/nav-desktop-select';

import type { typeCity } from '../../footer';
import type { NavMainProps } from '../types';

const panels = (city: City) => [
  {
    id: 'panel1',
    header: 'Planifica tu visita',
    content: [
      {
        label: 'Horarios y Dirección',
        path: getFullPath(paths[city as typeCity].horariosDireccion),
      },
      {
        label: 'Mapa de Acuario y Eventos',
        path: getFullPath(paths[city as typeCity].eventosMapa),
      },
      {
        label: 'Servicios',
        path: getFullPath(paths[city as typeCity].serviciosInstalaciones),
      },
      {
        label: 'Boletos y Actividades',
        path: getFullPath(paths[city as typeCity].actividadesInteracciones),
      },
      {
        label: 'Políticas de Accesos',
        path: getFullPath(paths[city as typeCity].politicasAccesos),
      },
      {
        label: 'Contacto',
        path: getFullPath(paths[city as typeCity].contacto),
      },
    ],
  },
];

const links = [
  {
    id: 'Quienes somos',
    label: 'Quiénes somos',
    path: getFullPath(paths.general.quienesSomos),
  },
  // {
  //   id: 'Conservación',
  //   label: 'Conservación',
  //   path: getFullPath(paths[city as typeCity].conservacion),
  // },
];

// ----------------------------------------------------------------------

export type NavMobileProps = NavMainProps & {
  open: boolean;
  onClose: () => void;
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  showSelectCity?: boolean;
};

export function NavMobile({
  data,
  open,
  onClose,
  slots,
  sx,
  showSelectCity = false,
}: NavMobileProps) {
  const pathname = usePathname();

  const { city, setCity } = useCityStore();

  const { user } = useUserStore();

  const router = useRouter();

  const { logout: logoutAuth0 } = useAuth0();
  const { logout } = useAuthStore();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          background: 'linear-gradient(180deg, #122A4B 60%, #050329 100%)',
          display: 'flex',
          flexDirection: 'column',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      {slots?.topArea ?? (
        <Box>
          {user ? (
            <>
              <Box
                display="flex"
                onClick={() => router.push('/user')}
                sx={{
                  m: 2.5,
                  p: '15px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(145, 158, 171, 0.10)',
                }}
              >
                <Avatar sx={{ width: 48, height: 48, mr: 2 }} src={user?.avatar} />
                <Box>
                  <Typography>{user?.name}</Typography>
                  <Typography>{user?.email}</Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                onClick={() => router.push('/user')}
                sx={{
                  cursor: 'pointer',
                  m: 2.5,
                  p: '15px',
                  borderRadius: '16px',
                  backgroundColor: 'rgba(145, 158, 171, 0.10)',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Futura Hv BT',
                    fontSize: '16px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                  }}
                >
                  Mis boletos
                </Typography>
              </Box>
            </>
          ) : (
            <Box
              display="flex"
              onClick={() => router.push('/auth/login')}
              sx={{
                m: 2.5,
                p: '15px',
                borderRadius: '16px',
                backgroundColor: 'rgba(145, 158, 171, 0.10)',
              }}
            >
              <Avatar sx={{ width: 48, height: 48, mr: 2 }} />
              <Box
                display="flex"
                flexDirection="column"
                sx={{ justifyContent: 'center', alignItems: 'center' }}
              >
                <Typography>Iniciar sesión</Typography>
              </Box>
            </Box>
          )}

          {showSelectCity && (
            <Box gap={1.5} display="flex" sx={{ px: 2.5, mb: 2, flexDirection: 'column', gap: 1 }}>
              <ButtonMichin
                h={50}
                onClick={() => {
                  if (city === 'CDMX') {
                    router.push(paths.michin.tickets);
                  } else if (city === 'GDL') {
                    window.open(process.env.NEXT_PUBLIC_URL_TIENDA_GDL, '_blank');
                  } else if (city === 'PUE') {
                    window.open(process.env.NEXT_PUBLIC_URL_TIENDA_PUE, '_blank');
                  }
                }}
                color="common.darkBlue"
                InitialBgColor="common.white"
                border="none"
              >
                Comprar boletos
              </ButtonMichin>
              <LocationSort
                slotProps={{ arrow: { placement: 'bottom-center' } }}
                location={city}
                bgBolor="rgba(255, 255, 255, 0.05)"
                height={45}
                onChange={(newValue) => {
                  setCity(newValue.value);
                  onClose();
                }}
                locationsOptions={[
                  { value: 'CDMX', label: 'Acuario Ciudad de México' },
                  { value: 'PUE', label: 'Acuario Puebla' },
                  { value: 'GDL', label: 'Acuario Guadalajara' },
                ]}
              />
            </Box>
          )}
        </Box>
      )}

      <Scrollbar fillContent>
        <Box
          component="nav"
          display="flex"
          flexDirection="column"
          flex="1 1 auto"
          sx={{ p: 3, pt: 0 }}
        >
          <AccordionMenuMobile panels={panels(city)} />
          {links.map((item) => (
            <Typography
              key={item.path}
              component={RouterLink}
              href={item.path}
              sx={{
                fontFamily: buttonFont,
                fontSize: pxToRem(20),
                color: 'common.white',
                textDecoration: 'none',
                mb: 2,
                fontWeight: 400, // Improved alignment for the icon
              }}
            >
              {item.label}
            </Typography>
          ))}
        </Box>
      </Scrollbar>

      {slots?.bottomArea && user && (
        <Box gap={1.5} display="flex" sx={{ px: 2.5, py: 3, flexDirection: 'column', gap: 1 }}>
          <ButtonMichin
            h={50}
            color="common.white"
            InitialBgColor="error.dark"
            border="none"
            onClick={() => {
              logout();
              logoutAuth0();
              router.refresh();
              onClose();
            }}
          >
            Cerrar sesión
          </ButtonMichin>
        </Box>
      )}
    </Drawer>
  );
}
