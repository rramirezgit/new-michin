import React from 'react';

import { Box, Typography } from '@mui/material';

import { buttonFont } from 'src/theme/core';

import { Image } from 'src/components/image';
import { MotionViewport } from 'src/components/animate';

import { MInview } from '../HomeHero';
import TitleSeccion from '../TitleSeccion';
import { CarouselDescubre } from './carrusel';

const infoItems = [
  { icon: '/assets/background/michin/icon-acuaticos.png', qty: 5000, type: 'Mar Abierto' },
  { icon: '/assets/background/michin/icon-forestales.png', qty: 12000, type: 'Bosque' },
  {
    icon: '/assets/background/michin/icon-selvaticos.png',
    qty: 8000,
    type: 'Selva',
  },
];

export default function DescubreNuestraDiversidad() {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        id="corales-rosa"
        sx={{
          position: 'absolute',
          top: {
            xs: '0',
            sm: '-1%',
            lg: '2%',
          },
          width: {
            xs: '126px',
            sm: '15%',
            md: '10%',
            lg: '145px',
          },
          height: {
            xs: '171px',
            sm: '40%',
            md: '30%',
            lg: '225px',
          },
          right: '0',
          background: 'url(/assets/background/michin/landing-animales/descubre1.png) no-repeat',
          backgroundPositionX: 'right',
          zIndex: 1,
          backgroundSize: 'contain',
        }}
      />
      <Box
        id="tortugas"
        sx={{
          position: 'absolute',
          top: {
            xs: '7%',
            sm: '3%',
            lg: '8%',
          },
          width: {
            xs: '121px',
            sm: '20%',
            md: '288px',
          },
          height: {
            xs: '166px',
            sm: '40%',
            md: '258px',
          },
          zIndex: 1,
          left: '0',
          background: 'url(/assets/background/michin/landing-animales/descubre2.png) no-repeat',
          backgroundSize: 'contain',
        }}
      />
      <Box
        component={MotionViewport}
        sx={{
          mt: {
            xs: '160px',
            sm: '12%',
          },
          padding: '0 26px',
          maxWidth: '1087px',
          margin: '0 auto',
        }}
      >
        <MInview
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            zIndex: 2,
            position: 'relative',
          }}
        >
          <TitleSeccion
            textAlign="center"
            subtitle="MARAVILLAS NATURALES"
            title="Descubre nuestra diversidad"
            description="Vive una experiencia única con nuestra variada fauna acuática y terrestre"
          />
        </MInview>
        <MInview>
          <Box
            sx={{
              display: 'flex',
              gap: {
                xs: '10px',
                md: '20px',
              },
              zIndex: 3,
              my: '40px',
              position: 'relative',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
            }}
          >
            {infoItems.map((item, index) => (
              <Items key={index} icon={item.icon} qty={item.qty} type={item.type} />
            ))}
          </Box>
        </MInview>
        <MInview>
          <Box
            sx={{
              mb: {
                xs: '50px',
                sm: '100px',
                zIndex: 3,
                position: 'relative',
              },
            }}
          >
            <CarouselDescubre />
          </Box>
        </MInview>
      </Box>
    </Box>
  );
}

interface ItemsProps {
  icon: string;
  qty: number;
  type: string;
}

const Items = ({ icon, qty, type }: ItemsProps) => (
  <Box
    sx={{
      gap: '35px',
      width: '100%',
      borderRadius: '15px',
      height: '75px',
      padding: {
        xs: '15px',
        sm: '15px',
      },
      border: '0.839px solid rgba(255, 255, 255, 0.50)',
      background: 'rgba(16, 24, 62, 0.25)',
      backdropFilter: 'blur(14.683377265930176px)',
    }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Image src={icon} alt={type} style={{ width: '44px', height: '44px' }} />

      <Typography component="span" fontSize={15}>
        <Typography component="span" sx={{ fontFamily: buttonFont, fontSize: 15 }}>
          +{qty}{' '}
        </Typography>
        Ejemplares en{' '}
        <Typography component="span" sx={{ fontFamily: buttonFont, fontSize: 15 }}>
          {type}
        </Typography>
      </Typography>
    </Box>
  </Box>
);
