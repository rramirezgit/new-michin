/* eslint-disable perfectionist/sort-imports */
import React, { useState, useEffect } from 'react';

import { Box, Container, Typography } from '@mui/material';

import { MotionViewport } from 'src/components/animate';
import { buttonFont } from 'src/theme/core';
import ButtonMichin from 'src/components/btn-michin';

import type { Product } from 'src/store/ticketsStore';
import { useTicketStore } from 'src/store/ticketsStore';
import { Image } from 'src/components/image';
import { useResponsive } from 'src/hooks/use-responsive';
import { useCityStore } from 'src/store/useCityStore';
import { MInview } from '../HomeHero';
import TitleSeccion from '../TitleSeccion';
import CarouselMichinNormal from '../../components/carrousel';

export default function ExperienciasUnicas() {
  const { products } = useTicketStore();
  const [interaction, setInteraction] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      setInteraction(products.filter((product) => product.access === false));
    }
  }, [products]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        id="carpincho-acuatico"
        sx={{
          position: 'absolute',
          top: {
            xs: '2%',
            sm: '-4%',
            md: '5%',
          },
          width: {
            xs: '121px',
            sm: '15%',
            md: '10%',
            lg: '136px',
          },
          height: {
            xs: '175px',
            sm: '40%',
            md: '30%',
            lg: '205px',
          },
          right: '0',
          background: 'url(/assets/background/michin/landing-animales/experiencias1.png) no-repeat',
          backgroundPositionX: 'right',
          backgroundSize: 'contain',
        }}
      />
      <Box
        id="doris"
        sx={{
          position: 'absolute',
          top: {
            xs: '2%',
            sm: '-10%',
            md: '-9%',
            lg: '-7%',
          },
          width: {
            xs: '50%',
            sm: '20%',
            md: '150px',
            lg: '196px',
          },
          height: {
            xs: '35%',
            sm: '45%',
            md: '240px',
            lg: '266px',
          },
          left: '0',
          background: 'url(/assets/background/michin/landing-animales/experiencias2.png) no-repeat',
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
            subtitle="INTERACCIONES"
            title="experiencias únicas"
            description="Descubre nuestras interacciones exclusivas que harán de tu visita un recuerdo inolvidable!"
          />
        </MInview>
      </Container>
      <CarouselMichinNormal>
        {interaction.map((item) => (
          <Items key={item.id} item={item} />
        ))}
      </CarouselMichinNormal>
    </Box>
  );
}

type ItemsProps = {
  item: Product;
};

const Items = ({ item }: ItemsProps) => {
  const smUp = useResponsive('up', 'sm');
  const { city } = useCityStore();
  return (
    <Box
      sx={{
        width: {
          xs: 214,
          sm: 260,
        },
        height: {
          xs: 242,
          sm: 295.226,
        },
        borderRadius: '22.513px',
        position: 'relative',
      }}
    >
      <Image
        src={item.image}
        alt={item.name}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '22.513px',
        }}
      />

      <Box
        sx={{
          // overlay
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '22.513px',
          background:
            'linear-gradient(36deg, rgba(10, 18, 53, 0.80) 34.97%, rgba(10, 18, 53, 0.30) 76.37%)',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: '22.513px',
          padding: {
            xs: '10px',
            sm: '20px',
          },
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}
      >
        <Box
          sx={{
            borderRadius: '8.919px',
            background: '#059444',
            display: 'inline-flex',
            minWidth: '35.676px',
            padding: '2.973px 8.919px',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8.919px',
            position: 'absolute',
            width: 'fit-content',
            top: '10px',
            left: '10px',
          }}
        >
          <Typography
            sx={{
              textAlign: 'right',
              fontFamily: 'UPBOLTERS',
              fontSize: '19.324px',
              fontStyle: 'normal',
              fontWeight: '400',
              lineHeight: '29.73px',
            }}
          >
            ${item.price} extra
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: {
                xs: '16px',
                sm: '20px',
              },
              fontWeight: 'bold',
              fontFamily: buttonFont,
              lineHeight: 'normal',
            }}
          >
            {item.name}
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: {
              xs: '12px',
              sm: '15px',
            },
            fontWeight: '300',
            mb: '10px',
            lineHeight: {
              xs: '16px',
              sm: '21.609px',
            },
          }}
        >
          {item.descSchedule}
        </Typography>
        {city === 'CDMX' && (
          <ButtonMichin
            h={35}
            w="100%"
            icon="/assets/icons/home/ic-right-blue.svg"
            color="common.darkBlue"
            hoverBgColor="secondary.main"
            InitialBgColor="common.white"
            border="none"
            sx={{
              fontSize: {
                xs: '13px',
                sm: '13px',
              },
              padding: {
                sm: '0px 0px',
              },
            }}
          >
            {!smUp ? 'Comprar' : 'Comprar Interacción'}
          </ButtonMichin>
        )}
      </Box>
    </Box>
  );
};
