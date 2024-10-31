/* eslint-disable perfectionist/sort-imports */
import React from 'react';
import Image from 'next/image';

import { Box, Button, Container, Typography } from '@mui/material';

import { MotionViewport } from 'src/components/animate';
import bgText from '#/assets/background/michin/landing-animales/bgTextMatitas.png';

import { buttonFont, subtitleFont } from 'src/theme/core';
import voluntariado from '#/assets/images/voluntariado.png';
import { MInview } from '../HomeHero';
import TitleSeccion from '../TitleSeccion';

export default function Diferencia() {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        paddingBottom: '40px',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: {
            xs: '-15%',
            sm: '-25%',
          },
          width: {
            xs: '15%',
            sm: '15%',
            md: '10%',
            lg: '8%',
            xl: '10%',
          },
          height: {
            xs: '30%',
            sm: '30%',
            md: '45%',
            lg: '55%',
            xl: '65%',
          },
          left: '0',
          background:
            'url(/assets/ElementosgraficosMichin/Imagenes-Landing/GaleriaImagenes/caballito.png) no-repeat',
          backgroundPositionX: 'right',
          backgroundSize: 'contain',
        }}
      />

      <Container component={MotionViewport} maxWidth="lg">
        <MInview
          sx={{
            display: 'flex',
            position: 'relative',
            zIndex: 1,
            justifyContent: 'left',
            width: '100%',
          }}
        >
          <TitleSeccion
            textAlign="left"
            subtitle="TU TAMBIÉN PUEDES AYUDAR"
            title="¿Quieres marcar la diferencia?"
            description="Trabajemos juntos por el planeta. Únete y ayuda a proteger la vida marina y terrestre"
          />
        </MInview>
        <Box
          sx={{
            position: 'relative',
            mt: {
              xs: '10%',
              sm: '41px',
            },
          }}
        >
          <Items />
        </Box>
      </Container>
    </Box>
  );
}

const Items = () => (
  <Box
    sx={{
      with: '100%',
      display: 'flex',
      flexDirection: {
        xs: 'column',
        sm: 'column',
        md: 'row',
      },
      justifyContent: 'center',
      gap: {
        xs: '0px',
        md: '20px',
      },
    }}
  >
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: 'auto',
        },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: {
            xs: 1,
          },
          height: {
            xs: 242,
            sm: 281,
            md: 281,
          },
          position: 'relative',
          borderRadius: '22.513px',
          border: ' 2.426px solid #53B5D4',
          background:
            'linear-gradient(36deg, rgba(10, 18, 53, 0.14) 34.97%, rgba(10, 18, 53, 0.21) 76.37%)',
          boxShadow: '0px 4.852px 4.852px 0px rgba(0, 0, 0, 0.25)',
        }}
      >
        <Image
          alt="voluntariado michin"
          src={voluntariado}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '22.513px',
          }}
        />
      </Box>
    </Box>
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: 'auto',
        },
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: {
            xs: 1,
          },
          height: {
            xs: 320,
            sm: 300,
          },
          padding: '10px',
          borderBottomLeftRadius: '22.513px',
          borderBottomRightRadius: '22.513px',
          position: 'relative',
        }}
      >
        <Image
          src={bgText}
          alt="bgText"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '22.513px',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '90%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            height: '100%',
          }}
        >
          <Box
            component={Typography}
            sx={{
              fontSize: {
                xs: 14,
                sm: 18,
              },
              mt: 2,
            }}
          >
            ¡En
            <Typography
              component="span"
              color="secondary.main"
              fontFamily={buttonFont}
              sx={{
                fontSize: {
                  xs: 14,
                  sm: 18,
                },
              }}
            >
              {' '}
              acuario MICHIN,{' '}
            </Typography>
            creemos firmemente que juntos podemos lograr grandes cosas. Una de nuestras metas es la
            conservación de nuestro medio ambiente y el cuidado de la naturaleza.
          </Box>

          <Box
            component={Typography}
            sx={{
              fontSize: {
                xs: 13,
                sm: 17,
              },
              fontFamily: subtitleFont,
            }}
          >
            Únete a esta causa a través de voluntariados y prácticas, y hagamos la diferencia
            juntos:
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: '10px',
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
            }}
          >
            <Button
              variant="michin"
              sx={{
                width: {
                  xs: '100%',
                  sm: '40%',
                },
              }}
              startIcon={
                <Image src="/assets/icons/home/ic-right.svg" width={31} height={31} alt="icon" />
              }
            >
              Voluntariado
            </Button>
            <Button
              variant="michin"
              sx={{
                width: {
                  xs: '100%',
                  sm: '40%',
                },

                padding: {
                  xs: '10px 15px',
                  sm: '10px 15px',
                },
              }}
              startIcon={
                <Image src="/assets/icons/home/ic-right.svg" width={31} height={31} alt="icon" />
              }
            >
              Programa Empresas
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>
);
