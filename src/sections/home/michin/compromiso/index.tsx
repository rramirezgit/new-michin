import React from 'react';
import Image from 'next/image';
import brujula from '#/assets/icons/brujula.png';
import lupamundo from '#/assets/icons/lupamundo.png';
import manoCorazon from '#/assets/icons/manoCorazon.png';

import { Box, Container, Typography } from '@mui/material';

import { secondaryFont } from 'src/theme/core';

import { MotionViewport } from 'src/components/animate';

import { MInview } from '../HomeHero';
import TitleSeccion from '../TitleSeccion';

export default function Compromiso() {
  const [data] = React.useState([
    {
      id: 1,
      title: 'MISIÓN',
      description: `Fomentar el <strong>cuidado, protección y conservación de la biodiversidad,</strong> inspirados en la cosmovisión de las culturas indígenas de México.`,
      icon: brujula,
    },

    {
      id: 2,
      title: 'VISIÓN',
      description:
        'Ser un factor clave a nivel mundial en la <strong>promoción y enseñanza de la sustentabilidad del medio ambiente.</strong>',
      icon: lupamundo,
    },
    {
      id: 3,
      title: 'VALORES',
      description:
        'Conciencia ecológica, respeto por la biodiversidad,<strong> responsabilidad social y educativa,</strong> comunión con los indígenas.',
      icon: manoCorazon,
    },
  ]);
  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        pt: 10,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: {
            xs: '9%',
            sm: '-1%',
          },
          width: {
            xs: '25%',
            sm: '15%',
          },
          height: {
            xs: '25%',
            sm: '25%',
          },
          right: '0',
          background: 'url(/assets/background/michin/landing-animales/compromiso2.png) no-repeat',
          backgroundPositionX: 'right',
          backgroundSize: 'contain',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: {
            xs: '5%',
            sm: '1%',
          },
          width: {
            xs: '25%',
            sm: '12%',
            md: '40%',
          },
          height: {
            xs: '35%',
            sm: '35%',
            md: '35%',
          },
          left: '0',
          background: 'url(/assets/background/michin/landing-animales/compromiso1.png) no-repeat',
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <MInview
          sx={{
            display: 'flex',
            position: 'relative',
            zIndex: 1,
            justifyContent: 'center',
            width: '100%',
            mb: 5,
          }}
        >
          <TitleSeccion
            textAlign="center"
            subtitle="LO QUE NOS IMPULSA"
            title="Preservar y proteger la biodiversidad marina"
            description=""
          />
        </MInview>
        <Box
          sx={{
            width: '100%',
            mt: {
              xs: '0px',
              sm: '50px',
            },
            mb: {
              xs: 2,
              sm: 3,
            },
            display: 'flex',
            flexDirection: {
              xs: 'column',
              sm: 'column',
              md: 'row',
            },
            gap: '40px',
            justifyContent: {
              xs: 'center',
            },
            alignItems: 'center',
          }}
        >
          {data.map((item) => (
            <Items item={item} key={item.id} />
          ))}
        </Box>
        <Box
          sx={{
            borderRadius: '25px',
            border: '0.917px solid rgba(242, 242, 242, 0.22)',
            background: '#040E45',
            maxWidth: '1060px',
            boxShadow: '9.171px 9.171px 36.683px 0px rgba(5, 15, 69, 0.20)',
            backdropFilter: 'blur(9.170731544494629px)',
            width: '100%',
            flexShrink: 0,
            mb: {
              xs: 20,
              sm: 30,
            },
            display: 'flex',
            flexDirection: {
              xs: 'column', // Para móviles
              sm: 'column', // Para escritorio
              md: 'row', // Para escritorio
            },
            alignItems: 'center',
            justifyContent: {
              xs: 'center',
              sm: 'space-around',
            },
            padding: '13px',
            gap: '10px',
          }}
        >
          <span
            style={{
              color: '#FFF',
              fontFamily: 'Futura Md BT',
              fontSize: '15px',
              fontStyle: 'normal',
              fontWeight: 400,
              padding: '0 30px 0 10',
              lineHeight: '22.01px',
              letterSpacing: '0.3px',
            }}
          >
            Nuestros ejes rectores en Michin
          </span>
          <Box
            sx={{
              display: 'flex',
              flex: 1,
              flexDirection: {
                xs: 'column', // Para móviles
                sm: 'column', // Para escritorio
                md: 'row', // Para escritorio
              },
              gap: '10px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1E2B62',
                borderRadius: '15px',
                padding: '5px 10px',
              }}
            >
              <Image src="/assets/icons/home/ic-tortuga.svg" width={24} height={24} alt="Rescate" />
              <Typography
                component="span"
                sx={{
                  fontFamily: 'Futura Bk BT',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '22.01px',
                }}
              >
                Rescate
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1E2B62',
                borderRadius: '15px',
                padding: '5px 10px',
              }}
            >
              <Image
                src="/assets/icons/home/ic-inv.svg"
                width={24}
                height={24}
                alt="Investigación"
              />
              <Typography
                component="span"
                sx={{
                  fontFamily: 'Futura Bk BT',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '22.01px',
                }}
              >
                Investigación
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                background: '#1E2B62',
                borderRadius: '15px',
                padding: '5px 10px',
              }}
            >
              <Image src="/assets/icons/home/ic-eddu.svg" width={24} height={24} alt="Educación" />
              <Typography
                component="span"
                sx={{
                  fontFamily: 'Futura Bk BT',
                  fontSize: '15px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '22.01px',
                }}
              >
                Educación a través del entretenimiento
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      <Box
        sx={{
          position: 'absolute',
          top: {
            xs: '88%',
            sm: '80%',
            md: '69%',
          },
          width: {
            xs: '19%',
            sm: '20%',
            lg: '236px',
          },
          height: {
            xs: '8%',
            sm: '35%',
            md: '30%',
            lg: '194px',
          },
          zIndex: 10,
          right: '0',
          background: 'url(/assets/background/michin/landing-animales/compromiso3.png) no-repeat',
          backgroundSize: 'contain',
          backgroundPositionX: 'right',
        }}
      />
    </Box>
  );
}

type ItemsProps = {
  item: {
    id: number;
    title: string;
    description: string;
    icon: any;
  };
};

const Items = ({ item }: ItemsProps) => (
  <Box
    key={item.id}
    sx={{
      display: 'flex',
      border: '0.917px solid rgba(242, 242, 242, 0.22)',
      boxShadow: '9.171px 9.171px 36.683px 0px rgba(5, 15, 69, 0.20)',
      borderRadius: '27px',
      backgroundColor: '#040E45',
      flexDirection: 'column',
      gap: '8px',
      padding: '25px',
      width: {
        xs: '100%',
        sm: '328px',
      },
      height: {
        xs: 200,
        sm: '188px',
      },
    }}
  >
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: '30%',
        },
        display: 'flex',
        alignItems: 'center',
        gap: '13px',
      }}
    >
      <Image src={item.icon} width={27} height={27} alt="icon" />
      <Box
        component={Typography}
        sx={{
          fontSize: {
            xs: '20px',
            sm: '33px',
          },
          fontFamily: secondaryFont,
        }}
      >
        {item.title}
      </Box>
    </Box>

    <Box
      component={Typography}
      sx={{
        fontSize: {
          xs: '16px',
          sm: '14px',
        },
        lineHeight: '21px',
      }}
      dangerouslySetInnerHTML={{ __html: item.description }}
    />
  </Box>
);
