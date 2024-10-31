/* eslint-disable perfectionist/sort-imports */
import type { SxProps } from '@mui/material';

import Image from 'next/image';
import { useState } from 'react';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';
import { ButtonBase, Typography } from '@mui/material';
import { bgBlur } from 'src/theme/styles';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';

import { useResponsive } from 'src/hooks/use-responsive';

import acuaticos1 from '#/assets/ElementosgraficosMichin/Imagenes-Landing/GaleriaImagenes/Tortuga-Acuatica1.png';
import acuaticos2 from '#/assets/ElementosgraficosMichin/Imagenes-Landing/GaleriaImagenes/Acuaticas2.png';

import forestales1 from '#/assets/ElementosgraficosMichin/Imagenes-Landing/GaleriaImagenes/Flamenco-Forestales1.png';
import forestales2 from '#/assets/ElementosgraficosMichin/Imagenes-Landing/GaleriaImagenes/Forestales2.png';

import selvaticos1 from '#/assets/ElementosgraficosMichin/Imagenes-Landing/GaleriaImagenes/Serpiente-Selvaticos1.png';
import selvaticos2 from '#/assets/ElementosgraficosMichin/Imagenes-Landing/GaleriaImagenes/Selvaticos2.png';
import { CarouselArrowFloatButtons } from './carousel-arrow-buttons';

const forestales = [
  {
    id: 1,
    coverUrl: forestales1,
  },
  {
    id: 2,
    coverUrl: forestales2,
  },
];

const selvaticos = [
  {
    id: 1,
    coverUrl: selvaticos1,
  },
  {
    id: 2,
    coverUrl: selvaticos2,
  },
];

const acuaticos = [
  {
    id: 1,
    coverUrl: acuaticos1,
  },
  {
    id: 2,
    coverUrl: acuaticos2,
  },
];

// ----------------------------------------------------------------------

export function CarouselDescubre() {
  const carousel = useCarousel();
  const theme = useTheme();

  const options: any = {
    acuaticos: 'mar abierto',
    selvaticos: 'selva',
    forestales: 'bosque',
  };

  const [dataCarrousel, setDataCarrousel] = useState(acuaticos);
  const [optionSelected, setOptionSelected] = useState(options.acuaticos);

  const handleClick = (option: string) => {
    setDataCarrousel(() => {
      if (option === 'selva') {
        return selvaticos;
      }
      if (option === 'bosque') {
        return forestales;
      }
      return acuaticos;
    });
    setOptionSelected(option);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Carousel carousel={carousel} sx={{ borderRadius: 2 }}>
        {dataCarrousel.map((item, index) => (
          <CarouselItem key={item.id} index={index} item={item} />
        ))}
      </Carousel>
      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          top: 16,
          right: '50%',
          color: 'commmon.white',
          position: 'absolute',
        }}
      />

      <CarouselArrowFloatButtons {...carousel.arrows} options={carousel.options} />

      <Box
        sx={{
          borderRadius: '0px 0px 15px 15px',
          border: `1px solid ${theme.palette.primary.main}`,
          position: 'absolute',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          height: 76,
          bottom: 0,
          ...bgBlur({
            color: 'transparent',
            blur: 5,
          }),
        }}
      >
        <BotonBaseCarousel
          onClick={() => handleClick(options.acuaticos)}
          selected={optionSelected}
          title={options.acuaticos}
          borderRadius="0px 10px 10px 15px"
        />
        <BotonBaseCarousel
          onClick={() => handleClick(options.forestales)}
          selected={optionSelected}
          borderRadius="10px"
          title={options.forestales}
        />
        <BotonBaseCarousel
          onClick={() => handleClick(options.selvaticos)}
          selected={optionSelected}
          borderRadius="10px 0px 15px 10px"
          title={options.selvaticos}
        />
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

type CarouselItemProps = {
  index: number;
  item: {
    id: number;
    coverUrl: any;
  };
};

function CarouselItem({ item, index }: CarouselItemProps) {
  return (
    <Box sx={{ position: 'relative' }}>
      <Image
        src={item.coverUrl}
        alt="asd"
        height={500}
        width={1200}
        style={{
          objectFit: 'cover', // cover, contain, none
        }}
        placeholder="blur"
      />
    </Box>
  );
}

type BotonBaseCarouselProps = {
  borderRadius: string;
  onClick?: any;
  selected?: string;
  title: string;
  sx?: SxProps;
};

function BotonBaseCarousel({ onClick, title, borderRadius, selected, sx }: BotonBaseCarouselProps) {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');

  const type =
    title === 'mar abierto' ? 'acuaticas' : title === 'selva' ? 'selvaticos' : 'forestales';

  return (
    <ButtonBase
      onClick={onClick}
      sx={{
        position: 'relative',
        width: '33%',
        height: '100%',
        textTransform: 'uppercase',
        borderRadius,
        border: selected === title ? `1px solid ${theme.palette.primary.main}` : 'none',
        boxShadow: selected === title ? 'inset 2px 2px 10px 2px rgba(83, 181, 212, 0.20)' : 'none',
        color:
          selected === title
            ? alpha(theme.palette.primary.contrastText, 1)
            : alpha(theme.palette.primary.contrastText, 0.5),
        fontSize: 16,
        fontWeight: 700,
        '&:hover .MuiTypography-root': {
          color: alpha(theme.palette.primary.contrastText, 1),
        },
        ...sx,
      }}
    >
      {smUp && (type === 'acuaticas' || type === 'forestales') && (
        <Image
          src={`/assets/background/michin/ic-${type}-1.png`}
          alt="asd"
          width={50}
          height={50}
          style={{
            position: 'relative',
            bottom: -10,
            opacity: selected === title ? 1 : 0,
          }}
        />
      )}

      <Typography
        sx={{
          transition: 'all 0.6s ease',
        }}
      >
        especies{' '}
        <Typography
          id="carousel-button-strong"
          variant="overline"
          sx={{
            transition: 'all 0.4s ease',
            fontWeight: 400,
            fontSize: {
              xs: 11,
              sm: 17.5,
            },
          }}
        >
          {title}
        </Typography>
      </Typography>

      {smUp && (type === 'acuaticas' || type === 'selvaticos') && (
        <Image
          src={`/assets/background/michin/ic-${type}-2.png`}
          alt="asd"
          width={50}
          height={50}
          style={{
            opacity: selected === title ? 1 : 0,
          }}
        />
      )}
    </ButtonBase>
  );
}
