import type { City } from 'src/store/useCityStore';

import React from 'react';

import { Box, Button, Container, IconButton, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useCityStore } from 'src/store/useCityStore';
import { socialMedias } from 'src/layouts/main/footer';

import { Logo } from 'src/components/logo';
import { Image } from 'src/components/image';
import IconAMText from 'src/components/svg/AMtext';

const CitySelector = () => {
  const smUp = useResponsive('up', 'sm');
  const { setCity } = useCityStore();

  const handleCity = (city: City) => {
    setCity(city);
  };

  return (
    <Box sx={{ height: '100vh', position: 'relative', width: '100%' }}>
      <video
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          backgroundColor: '#111836',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1,
        }}
      >
        <source
          src="/assets/video/shark-swimming-underwater-with-fish-in-a-peaceful-2024-07-30-21-41-52-utc.mp4"
          type="video/mp4"
        />
        Tu navegador no soporta el elemento de video.
      </video>
      <Container maxWidth="lg">
        <Box sx={{ height: '80vh' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
              maxWidth: '689px',
              margin: '0 auto',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: '100%',
                mb: smUp ? 0 : 3,
              }}
            >
              <Logo width={smUp ? 266 : 166} height={smUp ? 62 : 38} />
              <Box sx={{ position: 'absolute', right: 0, mr: smUp ? 3 : 4 }}>
                <IconAMText width={smUp ? 93 : 53} height={smUp ? 85 : 55} />
              </Box>
            </Box>
            <Box sx={{ textAlign: 'center' }}>
              <Typography
                sx={{
                  textAlign: 'center',
                  textShadow: '7.574px 7.574px 6.059px rgba(0, 0, 0, 0.05)',
                  fontFamily: 'UPBOLTERS',
                  fontSize: {
                    xs: '18px',
                    sm: '29.357px',
                    lg: '35.357px',
                  },
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: {
                    xs: '35px',
                    sm: '60px',
                    lg: '73.543px',
                  },
                }}
              >
                DESCUBRE LA MAGIA DE NUESTROS ACUARIOS EN
              </Typography>
              <Typography
                sx={{
                  color: '#FFF',
                  fontFamily: 'UPBOLTERS',
                  fontSize: {
                    xs: '38px',
                    sm: '60px',
                    lg: '73.543px',
                  },
                  fontStyle: 'normal',
                  lineHeight: {
                    xs: '40px',
                    sm: '40px',
                    lg: '50px',
                  },
                }}
              >
                TRES INCREÍBLES SEDES
              </Typography>
            </Box>
            <Typography
              sx={{
                mt: smUp ? 5 : 2,
                textAlign: 'center',
                textShadow: '5px 5px 4px rgba(0, 0, 0, 0.05)',
                fontFamily: 'Futura Hv BT',
                fontSize: {
                  xs: '16px',
                  sm: '22px',
                },
                fontStyle: 'normal',
                lineHeight: '50px',
              }}
            >
              ¿Desde qué ciudad nos visitas?
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: {
                  xs: 'column',
                  sm: 'column',
                  md: 'row',
                },
                gap: '15px',
                justifyContent: 'center',
              }}
            >
              <Button
                variant="michin"
                onClick={() => handleCity('CDMX')}
                startIcon={
                  <Image
                    src="/assets/icons/home/ic-tortuga.svg"
                    width={32}
                    height={34}
                    alt="icon"
                  />
                }
                sx={{ justifyContent: 'flex-start' }}
              >
                Ciudad de México
              </Button>
              <Button
                variant="michin"
                onClick={() => handleCity('PUE')}
                startIcon={
                  <Image src="/assets/icons/home/ic-medusa.svg" width={32} height={34} alt="icon" />
                }
                sx={{ justifyContent: 'flex-start' }}
              >
                Puebla
              </Button>
              <Button
                variant="michin"
                onClick={() => handleCity('GDL')}
                startIcon={
                  <Image src="/assets/icons/home/ic-pez.svg" width={34} height={34} alt="icon" />
                }
                sx={{ justifyContent: 'flex-start' }}
              >
                Guadalajara
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
      <Box
        sx={{
          backgroundColor: '#111836',
          textAlign: 'center',
          padding: '4px 0',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: {
              xs: 'column-reverse',
              sm: 'row',
            },
            justifyContent: 'space-between',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontFamily: 'Futura Bk BT',
              fontSize: {
                xs: '12px',
                sm: '14px',
              },
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '0.36px',
            }}
          >
            Copyright © {new Date().getFullYear()} Todos los derechos reservados.{' '}
            <Typography
              component="a"
              href="#"
              sx={{
                color: '#FFCE07',
                fontFamily: 'Futura Hv BT',
                fontSize: {
                  xs: '12px',
                  sm: '14px',
                },
                textDecoration: 'none',
                fontStyle: 'normal',
                fontWeight: 400,
                lineHeight: 'normal',
                letterSpacing: '0.36px',
              }}
            >
              Acuario Michin
            </Typography>
          </Typography>
          <Box>
            {socialMedias.map((social) => (
              <IconButton key={social.href} href={social.href}>
                <social.Icon width={smUp ? 44 : 40} height={smUp ? 44 : 40} />
              </IconButton>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default CitySelector;
