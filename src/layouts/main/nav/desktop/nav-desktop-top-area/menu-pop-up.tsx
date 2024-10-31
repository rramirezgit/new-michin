import React from 'react';
import Image from 'next/image';

import { useTheme } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

import { pxToRem } from 'src/theme/styles';

import MapIcon from 'src/components/svg/Map';
import DocIcon from 'src/components/svg/Doc';
import FAQIcon from 'src/components/svg/Preguntas';
import TicketsIcon from 'src/components/svg/Tickets';
import CalendarIcon from 'src/components/svg/Calendar';

import MoreInfo from './More-info';
import MenuSection from './menu-section';
import ServiciosIcon from '../../../../../components/svg/Servicios';

// Datos para las preguntas frecuentes
const panels = [
  {
    id: 'panel1',
    header: 'Conoce y compra tus accesos',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
  },
  {
    id: 'panel2',
    header: 'Conoce y compra tus accesos',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
  },
  {
    id: 'panel3',
    header: 'Conoce y compra tus accesos',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
  },
  {
    id: 'panel4',
    header: 'Conoce y compra tus accesos',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
  },
];

// Componente principal MenuPopUp
const MenuPopUp: React.FC = () => {
  const theme = useTheme();

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: '20px', md: '60px' },
          width: 1,
        }}
      >
        {/* Sección de horarios y ubicación */}
        <Box>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: 'UPBOLTERS',
              fontSize: 24,
              fontStyle: 'normal',
              mb: '28px',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            Planifica tu visita
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '31px',
              maxWidth: '319px',
            }}
          >
            <MenuSection
              title="Horarios y Dirección"
              subtitle="Abierto 365 días al año - Calz. San Juan de Aragón 399, Granjas Modernas CDMX"
              Icon={CalendarIcon}
            />
            <MenuSection
              title="Mapa de Acuario y Eventos"
              subtitle="Conoce nuestros rincones y anótate a nuestros eventos."
              Icon={MapIcon}
            />
            <MenuSection
              title="Políticas de Accesos"
              subtitle="Conoce todas nuestras políticas obligatorias."
              Icon={DocIcon}
            />
          </Box>
        </Box>

        {/* Sección de boletos y contacto */}
        <Box>
          <Box
            style={{
              height: '28px',
              marginBottom: '28px',
            }}
          />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '31px',
              maxWidth: 332,
            }}
          >
            <MenuSection
              title="Boletos y Actividades"
              subtitle="Accesos a partir de $369. Las entradas son limitadas y no hay reservaciones."
              Icon={TicketsIcon}
            />

            <MenuSection
              title="Servicios e Instalaciones"
              subtitle="Descubre todo lo que puedas hacer en nuestras instalaciones."
              Icon={ServiciosIcon}
            />
            <MenuSection
              title="Preguntas Frecuentes"
              subtitle="¿Tenes dudas? Estamos para ayudarte."
              Icon={FAQIcon}
            />
          </Box>
        </Box>

        {/* Sección de preguntas frecuentes */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}
        >
          <MoreInfo />
        </Box>
      </Box>
      <Box sx={{ display: 'flex', gap: '15px', width: 1, justifyContent: 'center', mt: '40px' }}>
        <Typography sx={{ fontSize: pxToRem(15), display: 'flex', alignItems: 'center' }}>
          <Image
            src="/assets/icons/home/ic-mail.svg"
            alt="icono de correo electrónico"
            width={20}
            height={20}
            style={{ marginRight: 10 }}
          />
          contactocdmx.michin@gmail.com
        </Typography>

        <Typography sx={{ fontSize: pxToRem(15), display: 'flex', alignItems: 'center' }}>
          <Image
            src="/assets/icons/home/ic-cel.svg"
            alt="icono de teléfono"
            width={20}
            height={20}
            style={{ marginRight: 10 }}
          />
          55 9421 8850
        </Typography>
      </Box>
    </Box>
  );
};

export default MenuPopUp;
