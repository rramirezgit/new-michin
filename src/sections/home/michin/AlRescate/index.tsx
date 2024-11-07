/* eslint-disable perfectionist/sort-imports */
import React from 'react';
import Image from 'next/image';

import type { SxProps } from '@mui/material';
import { Box, Button, Container, Typography } from '@mui/material';

import { MotionViewport } from 'src/components/animate';
import tortuga from '#/assets/background/michin/landing-animales/tortuga.png';
import pinguinos from '#/assets/background/michin/landing-animales/pinguinos.png';
import guacamayas from '#/assets/background/michin/landing-animales/guacamayas.png';
import bgText from '#/assets/background/michin/landing-animales/bgTextMatitas.png';

import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';
import { buttonFont, subtitleFont } from 'src/theme/core';
import IconAMText from 'src/components/svg/AMtext';
import { useResponsive } from 'src/hooks/use-responsive';
import { MInview } from '../HomeHero';
import TitleSeccion from '../TitleSeccion';
import BotonCarrusel from '../DescubreNuestraDiversidad/carrusel/Boton';

export default function AlRescate() {
  const smUp = useResponsive('up', 'sm');
  const carousel = useCarousel({
    align: 'center',
  });

  const [dataCarrousel] = React.useState([
    {
      id: 1,
      Text: (
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
            Cada tortuga que cuidamos tiene una historia única, llena de esfuerzo y dedicación. Una
            de las más conmovedoras es la de Kelly, una hermosa tortuga prieta.
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
              Kelly fue encontrada en una pileta de una casa en Veracruz, México, al borde de la
              muerte.{' '}
            </Typography>
            Gracias al esfuerzo incansable de nuestro equipo, logramos rehabilitarla.
          </Box>

          <Box
            component={Typography}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: {
                xs: 12,
                sm: 14,
              },
              fontFamily: subtitleFont,
            }}
          >
            <Typography
              sx={{
                flex: 1,
              }}
            >
              “Cuando visitas Acuario Michin, aprendes y a su vez aportas a nuestros programas de
              conservación, educación y rescate¨
            </Typography>
            <IconAMText
              style={{
                width: smUp ? '85px' : '60px',
                height: smUp ? '105px' : '80px',
              }}
            />
          </Box>
        </Box>
      ),
      coverUrl: tortuga,
    },
    {
      id: 2,
      Text: (
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
            Desde los inicios de Michin,
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
              se construyó un refugio para las guacamayas llamada “La casa de las Aves”.
            </Typography>
            Fueron rescatadas de decomisadas, posesiones ilegales, maltrato y del mercado negro;
            donde{' '}
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
              se han encontrado envueltas en toallas a punto de asfixiarse o introducidas en tubos
              de cartón metidas a presión para evitar que se mueran o parlen.
            </Typography>
          </Box>

          <Box
            component={Typography}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: {
                xs: 12,
                sm: 14,
              },
              fontFamily: subtitleFont,
            }}
          >
            <Typography
              sx={{
                flex: 1,
              }}
            >
              “Cuando visitas Acuario Michin, aprendes y a su vez aportas a nuestros programas de
              conservación, educación y rescate¨
            </Typography>
            <IconAMText
              style={{
                width: smUp ? '85px' : '60px',
                height: smUp ? '105px' : '80px',
              }}
            />
          </Box>
        </Box>
      ),
      coverUrl: guacamayas,
    },
    {
      id: 3,
      Text: (
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
                xs: 12,
                sm: 14,
              },
              mt: 2,
            }}
          >
            En la ultima década sus poblaciones
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
              se han reducido drásticamente{' '}
            </Typography>
            a consecuencia de la escasez de lugares de anidación, reducción en la oferta de
            alimentos, depredación y, el impacto de fenómenos climáticos severos, como El niño.
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
              Hoy quedan alrededor de 6mil parejas reproductoras,{' '}
            </Typography>
            y por ello formamos parte de un programa de preproducción y liberación de pingüinos.
          </Box>

          <Box
            component={Typography}
            sx={{
              display: 'flex',
              alignItems: 'center',
              fontSize: {
                xs: 12,
                sm: 14,
              },
              fontFamily: subtitleFont,
            }}
          >
            <Typography
              sx={{
                flex: 1,
              }}
            >
              “Cuando visitas Acuario Michin, aprendes y a su vez aportas a nuestros programas de
              conservación, educación y rescate¨
            </Typography>
            <IconAMText
              style={{
                width: smUp ? '85px' : '60px',
                height: smUp ? '105px' : '80px',
              }}
            />
          </Box>
        </Box>
      ),
      coverUrl: pinguinos,
    },
  ]);
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        id="medusas"
        sx={{
          position: 'absolute',
          top: {
            xs: '1%',
            sm: '5%',
            lg: '0%',
          },
          width: {
            xs: '62px',
            sm: '15%',
            md: '10%',
            lg: '8%',
          },
          height: {
            xs: '232px',
            sm: '30%',
            md: '45%',
            lg: '55%',
          },
          right: '0',
          background: 'url(/assets/background/michin/landing-animales/alRescate.png) no-repeat',
          backgroundPositionX: 'right',
          backgroundSize: 'contain',
        }}
      />

      <Container
        component={MotionViewport}
        maxWidth="lg"
        sx={{
          mt: {
            xs: '45%',
            sm: '12%',
          },
        }}
      >
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
            subtitle="MÁS DE 50 ESPECIES RESCATADAS"
            title="acuario michin, al rescate de especies"
            description="Historias que nos hacen sentir orgullosos"
          />
        </MInview>
        <Box
          sx={{
            position: 'relative',
            mt: {
              xs: '10%',
              sm: 10,
            },
          }}
        >
          <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
            {dataCarrousel.map((item) => (
              <Items key={item.id} item={item} />
            ))}
          </Carousel>

          <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

          <CarouselDotButtons
            scrollSnaps={carousel.dots.scrollSnaps}
            selectedIndex={carousel.dots.selectedIndex}
            onClickDot={carousel.dots.onClickDot}
            sx={{
              color: 'white',
              position: 'absolute',
              bottom: -40,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 2,
              zIndex: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: {
              xs: '70px',
              sm: '70px',
            },
          }}
        >
          <Button
            variant="michin"
            startIcon={
              <Image src="/assets/icons/home/ic-right.svg" width={31} height={31} alt="icon" />
            }
          >
            AM Preservación y Conservación
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

type ItemsProps = {
  item: {
    id: number;
    Text: any;
    coverUrl: any;
  };
};

const Items = ({ item }: ItemsProps) => (
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
            xs: 320,
            sm: 336,
          },
          height: {
            xs: 242,
            sm: 290,
          },
          borderRadius: '22.513px',
          position: 'relative',
        }}
      >
        <Image
          src={item.coverUrl}
          alt={`${item.id}`}
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
            xs: 320,
            sm: 628,
          },
          height: {
            xs: 320,
            sm: 290,
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

        {item.Text}
      </Box>
    </Box>
  </Box>
);
function CarouselArrowFloatButtons({
  options,
  slotProps,
  onClickPrev,
  onClickNext,
  disablePrev,
  disableNext,
}: any) {
  const baseStyles: SxProps = {
    zIndex: 9,
    top: {
      xs: '40%',
      sm: '50%',
    },
    borderRadius: 1.5,
    position: 'absolute',
    transform: 'translateY(-50%)',
  };

  return (
    <>
      <Box sx={{ left: 10, ...baseStyles }}>
        <BotonCarrusel onClick={onClickPrev} direction="right" />
      </Box>

      <Box sx={{ right: 10, ...baseStyles }}>
        <BotonCarrusel onClick={onClickNext} direction="left" />
      </Box>
    </>
  );
}
