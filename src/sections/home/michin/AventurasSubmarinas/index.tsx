import type { Product } from 'src/store/ticketsStore';

import Image from 'next/image';
import React, { useEffect } from 'react';
import bgLinea from '#/assets/background/michin/topAventurasSubmarinas.png';

import { useTheme } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useCityStore } from 'src/store/useCityStore';
import { useTicketStore } from 'src/store/ticketsStore';

import ButtonMichin from 'src/components/btn-michin';
import { MotionViewport } from 'src/components/animate';

import TitleSeccion from '../TitleSeccion';
import CarouselMichin from '../../components/carrouselInfinite';

export default function AventurasSubmarinas() {
  const { fetchProducts, products } = useTicketStore();
  const { city } = useCityStore();

  useEffect(() => {
    fetchProducts();
  }, [city, fetchProducts]);

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        id="Peces-amarillos-con-plantas"
        sx={{
          position: 'absolute',
          top: {
            xs: '0.8%',
            sm: '1.1%',
            lg: '1.4%',
          },
          width: {
            xs: '143px',
            sm: '150px',
            lg: '180px',
          },
          height: {
            xs: '170px',
            sm: '180px',
            lg: '241px',
          },
          right: '0',
          background: 'url(/assets/background/michin/landing-animales/aventura1.png) no-repeat',
          backgroundSize: 'cover',
        }}
      />
      <Box
        sx={{
          width: '100%',
          position: 'absolute',
          top: '-74px',
          height: '68px',
        }}
      >
        <Image
          alt="fondo-marino"
          src={bgLinea}
          placeholder="blur"
          style={{
            width: '100%',
          }}
        />
      </Box>
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
        <TitleSeccion
          subtitle="ACCESOS IMPERDIBLES"
          title="aventuras submarinas"
          description="Consigue tus boletos y disfruta de cada rincón del acuario"
        />
      </Container>

      <CarouselMichin>
        {products.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </CarouselMichin>
    </Box>
  );
}

interface CarouselItemProps {
  item: Product;
}

function CarouselItem({ item }: CarouselItemProps) {
  const theme = useTheme();
  const smUp = useResponsive('up', 'sm');
  return (
    <Box
      sx={{
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        gap: '10px',
        flexDirection: 'column',
        alignItems: 'center',
        pt: '35%',
        pb: '7%',
        height: {
          xs: '338px',
          sm: '361px',
        },
        width: {
          xs: '209px',
          sm: '237px',
        },
        background: `url(/assets/background/michin/boletos/1.svg) no-repeat`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        zIndex: 1,
      }}
    >
      <Box
        sx={{
          borderRadius: '13px',
          background: 'linear-gradient(163deg, #279CC8 17.18%, #155C77 67.08%)',
          position: 'absolute',
          maxWidth: '190px',
          maxHeight: '232px',
          width: '100%',
          height: '100%',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -70%)',
          zIndex: -1,
        }}
      >
        <img
          src={item.image}
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '13px',
          }}
        />
      </Box>
      <Typography
        variant="h3"
        sx={{
          maxWidth: '75%',
          textAlign: 'center',
          fontSize: {
            xs: '24px',
            sm: '23px',
          },
        }}
      >
        {item.name}
      </Typography>
      <Typography
        variant="h3"
        sx={{
          color: theme.palette.secondary.main,
          textShadow: '0px 3.638px 3.638px rgba(0, 0, 0, 0.25)',
          flex: 1,
          fontSize: {
            xs: '24px',
            sm: '23px',
          },
        }}
      >
        {item.price}
      </Typography>

      <ButtonMichin
        h={smUp ? 38 : 40}
        icon="/assets/icons/home/ic-right.svg"
        color="common.darkBlue"
        InitialBgColor={theme.palette.secondary.main}
        hoverBgColor={theme.palette.primary.main}
        border="none"
        sx={{
          fontSize: {
            xs: '10px',
            sm: '10.5px',
          },
        }}
      >
        {smUp ? 'Comprar boletos' : 'Comprar'}
      </ButtonMichin>
    </Box>
  );
}
