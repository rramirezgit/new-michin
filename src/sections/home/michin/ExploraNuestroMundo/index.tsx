/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable perfectionist/sort-imports */
import React, { useEffect } from 'react';
import Image from 'next/image';

import { Box, Button, Container } from '@mui/material';

import { MotionViewport } from 'src/components/animate';

// CDMX
import PlantaBaja from '#/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/ciudadmexico/PlantaBaja.png';
import Nivel1 from '#/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/ciudadmexico/Niveles1.png';
import Nivel2 from '#/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/ciudadmexico/Niveles2.png';

// PU

import PlantaBajaPU from '#/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/puebla/PlantaBaja.png';
import PlantaAltaPU from '#/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/puebla/PlantaAlta.png';

// GDLJL

import PlantaBajaGU from '#/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/guadalajara/PlantaBaja.png';
import PlantaAltaGU from '#/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/guadalajara/PlantaAlta.png';

import { useCityStore } from 'src/store/useCityStore';
import { MInview } from '../HomeHero';
import TitleSeccion from '../TitleSeccion';
import CarouselMichinVertical from '../../components/carruselVerticalMichin';

const CDMX = [
  {
    id: 1,
    title: 'PLANTA BAJA',
    description: '',
    imgenCarrusel: PlantaBaja,
    urlstring:
      '/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/ciudadmexico/expandido/PLANTABAJA.png',
  },

  {
    id: 2,
    title: 'NIVEL 1',
    description: '',
    imgenCarrusel: Nivel1,
    urlstring:
      '/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/ciudadmexico/expandido/NIVEL1.png',
  },
  {
    id: 3,
    title: 'NIVEL 2',
    description: '',
    imgenCarrusel: Nivel2,
    urlstring:
      '/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/ciudadmexico/expandido/NIVEL2.png',
  },
].reverse();

const PU = [
  {
    id: 1,
    title: 'PLANTA BAJA',
    description: '',
    imgenCarrusel: PlantaBajaPU,
    urlstring:
      '/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/puebla/expandido/PlantaBaja.png',
  },

  {
    id: 2,
    title: 'PLANTA ALTA',
    description: '',
    imgenCarrusel: PlantaAltaPU,
    urlstring:
      '/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/puebla/expandido/PlantaAlta.png',
  },
].reverse();

const GDLJL = [
  {
    id: 1,
    title: 'PLANTA BAJA',
    description: '',
    imgenCarrusel: PlantaBajaGU,
    urlstring:
      '/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/guadalajara/expandido/PlantaBaja.png',
  },

  {
    id: 2,
    title: 'PLANTA ALTA',
    description: '',
    imgenCarrusel: PlantaAltaGU,
    urlstring:
      '/assets/ElementosgraficosMichin/ElementosGraficos/ComponentesdeLanding/MapadeAcuario/guadalajara/expandido/PlantaAlta.png',
  },
].reverse();

export default function ExploraNuestroMundo() {
  const [dataCarrousel, setDataCarrousel] = React.useState(CDMX);

  const { city } = useCityStore();

  const handleDownload = () => {
    let urlDoc = '';

    if (city === 'CDMX') {
      urlDoc = '/assets/pdf/CDMX.pdf';
    }

    if (city === 'PUE') {
      urlDoc = '/assets/pdf/Puebla.pdf';
    }

    if (city === 'GDL') {
      urlDoc = '/assets/pdf/Guadalajara.pdf';
    }

    const link = document.createElement('a');
    link.href = urlDoc;
    link.download = `mapa-acuario-${city}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (city === 'CDMX') {
      setDataCarrousel(CDMX);
    } else if (city === 'PUE') {
      setDataCarrousel(PU);
    } else if (city === 'GDL') {
      setDataCarrousel(GDLJL);
    }
  }, [city]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        id="pulpo"
        sx={{
          position: 'absolute',
          top: {
            xs: '9%',
            sm: '10%',
            md: '20%',
          },
          width: {
            xs: '25%',
            sm: '130px',
            md: '150px',
            lg: '207px',
          },
          height: {
            xs: '25%',
            sm: '200px',
            md: '240px',
            lg: '262px',
          },
          right: '0',
          background: 'url(/assets/background/michin/landing-animales/Explora2.png) no-repeat',
          backgroundPositionX: 'right',
          backgroundSize: 'contain',
        }}
      />
      <Box
        id="estrella-marina-plantas"
        sx={{
          position: 'absolute',
          top: {
            xs: '0%',
            sm: '3%',
          },
          width: {
            xs: '20%',
            sm: '15%',
            md: '120px',
            lg: '182px',
          },
          height: {
            xs: '30%',
            sm: '25%',
            md: '300px',
            lg: '329px',
          },
          left: '0',
          background: 'url(/assets/background/michin/landing-animales/Explora1.png) no-repeat',
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
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <TitleSeccion
            textAlign="center"
            subtitle="MAPA DE ACUARIO"
            title="Explora nuestro mundo"
            description="Descubre cada rincón del acuario "
          />
        </MInview>
      </Container>

      <Box
        sx={{
          mt: {
            xs: '0px',
            sm: '50px',
          },
        }}
      >
        <CarouselMichinVertical dataCarrousel={dataCarrousel}>
          {dataCarrousel.map((item, index) => (
            <Items key={item.id} item={item} />
          ))}
        </CarouselMichinVertical>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          mt: {
            xs: '50px',
            sm: '25px',
          },
        }}
      >
        <Button
          variant="michin"
          onClick={handleDownload}
          startIcon={
            <Image src="/assets/icons/home/ic-down.svg" width={31} height={31} alt="icon" />
          }
        >
          Descargar Mapa
        </Button>
      </Box>

      <Box
        id="tiburon"
        sx={{
          position: 'absolute',
          top: {
            xs: '81%',
            sm: '80%',
            md: '80%',
          },
          width: {
            xs: '19%',
            sm: '100px',
            md: '150px',
            lg: '177px',
          },
          height: {
            xs: '15%',
            sm: '200px',
            md: '256px',
            lg: '286px',
          },
          zIndex: 10,
          left: '0',
          background: 'url(/assets/background/michin/landing-animales/Explora3.png) no-repeat',
          backgroundSize: 'contain',
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
    imgenCarrusel: any;
  };
};

const Items = ({ item }: ItemsProps) => (
  <Box
    sx={{
      margin: '0 auto',
      width: {
        xs: '85%',
        sm: 500,
        md: 600,
        lg: 653,
      },
      height: {
        xs: 242,
        sm: 300,
        md: 300,
        lg: 296,
      },
      borderRadius: '22.513px',
      position: 'relative',
    }}
  >
    <Image
      src={item.imgenCarrusel}
      alt={`${item.id}`}
      style={{
        zIndex: 1,
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        borderRadius: '22.513px',
      }}
    />
  </Box>
);
