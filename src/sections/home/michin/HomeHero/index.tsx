import type { MotionValue } from 'framer-motion';
import type { BoxProps } from '@mui/material/Box';
import type { SxProps } from '@mui/material/styles';
import type { StackProps } from '@mui/material/Stack';

import Image from 'next/image';
import { useRef, useState } from 'react';
import { m, useScroll, useSpring, useTransform, useMotionValueEvent } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useResponsive } from 'src/hooks/use-responsive';

import { SvgColor } from 'src/components/svg-color';
import { varFade, MotionContainer } from 'src/components/animate';

import { HeroBackground } from '../../components/hero-background';

// ----------------------------------------------------------------------

const mdKey = 'md';

export function HomeHeroMichin({ sx, ...other }: StackProps) {
  const theme = useTheme();

  const scroll = useScrollPercent();

  const mdUp = useResponsive('up', mdKey);

  const distance = mdUp ? scroll.percent : 0;

  const y1 = useTransformY(scroll.scrollY, distance * -7);
  const y2 = useTransformY(scroll.scrollY, distance * -6);
  const y3 = useTransformY(scroll.scrollY, distance * -5);

  // const opacity: MotionValue<number> = useTransform(
  //   scroll.scrollY,
  //   [0, 1],
  //   [1, mdUp ? Number((1 - scroll.percent / 100).toFixed(1)) : 1]
  // );

  const renderHeading = (
    <MInview>
      <Typography
        sx={{
          fontFamily: 'UPBOLTERS',
          fontSize: { xs: '40px', sm: '50px', md: '56px', lg: '58px' },
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
        }}
      >
        MÁS QUE UN ACUARIO
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '23px', sm: '31px', md: '33px', lg: '35px' },
          fontFamily: 'UPBOLTERS',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
        }}
      >
        EN MICHIN APRENDE DIVIRTIÉNDOTE
      </Typography>
    </MInview>
  );

  const renderText = (
    <MInview>
      <Typography variant="subtitle2">
        Compra tus boletos y disfruta de las actividades más increíbles
      </Typography>
    </MInview>
  );

  const renderButtons = (
    <Box display="flex" flexWrap="wrap" gap={{ xs: 1.5, sm: 2 }}>
      <MInview>
        <Button
          variant="michinStartIcon"
          startIcon={<SvgColor src="/assets/icons/home/ic-ticket.svg" width={31} />}
        >
          Comprar boletos
        </Button>
      </MInview>

      <MInview>
        <Button
          variant="michin"
          startIcon={
            <Image src="/assets/icons/home/ic-right.svg" width={31} height={31} alt="icon" />
          }
        >
          Ver actividades
        </Button>
      </MInview>
    </Box>
  );

  return (
    <Stack
      ref={scroll.elementRef}
      component="section"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        height: '85vh',
        mt: 'calc(var(--layout-header-desktop-height) * -1)',
        [theme.breakpoints.up(mdKey)]: {
          minHeight: 760,
          maxHeight: 1440,
          display: 'block',
          willChange: 'opacity',
        },
        ...sx,
      }}
      {...other}
    >
      <Box
        component={m.div}
        // style={{ opacity }}
        sx={{
          width: 1,
          height: 1,
          display: 'flex',
          position: 'relative',
          flexDirection: 'column',
          transition: theme.transitions.create(['opacity']),
        }}
      >
        <Container
          maxWidth="lg"
          component={MotionContainer}
          sx={{
            py: 3,
            gap: '20px',
            height: 1,
            zIndex: 9,
            display: 'flex',
            flexDirection: 'column',
            [theme.breakpoints.up(mdKey)]: {
              justifyContent: 'center',
              py: 'var(--layout-header-desktop-height)',
            },
          }}
        >
          <Stack
            spacing={0}
            sx={{
              maxWidth: 4794,
            }}
          >
            <m.div
              style={{
                y: y1,
                maxWidth: 'max-content',
              }}
            >
              <Box
                sx={{
                  mt: {
                    xs: '96px',
                    md: '0px',
                  },
                  display: 'flex',
                  mb: '20px',
                  justifyContent: 'center',
                }}
              >
                {/* <Logo height={38} width={171} /> */}
              </Box>
              {renderHeading}
            </m.div>
            <m.div style={{ y: y2 }}>{renderText}</m.div>
          </Stack>
          <m.div style={{ y: y3 }}>{renderButtons}</m.div>
        </Container>

        <HeroBackground />
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type MInviewProps = BoxProps & {
  children: React.ReactNode;
  sx?: SxProps;
};

export function MInview({ children, component = m.div, sx = {} }: MInviewProps) {
  return (
    <Box component={component} variants={varFade({ distance: 24 }).inUp} sx={sx}>
      {children}
    </Box>
  );
}

// ----------------------------------------------------------------------

function useTransformY(value: MotionValue<number>, distance: number) {
  const physics = {
    mass: 0.1,
    damping: 20,
    stiffness: 300,
    restDelta: 0.001,
  };

  return useSpring(useTransform(value, [0, 1], [0, distance]), physics);
}

function useScrollPercent() {
  const elementRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();

  const [percent, setPercent] = useState(0);

  useMotionValueEvent(scrollY, 'change', (scrollHeight) => {
    let heroHeight = 0;

    if (elementRef.current) {
      heroHeight = elementRef.current.offsetHeight;
    }

    const scrollPercent = Math.floor((scrollHeight / heroHeight) * 100);

    if (scrollPercent >= 100) {
      setPercent(100);
    } else {
      setPercent(Math.floor(scrollPercent));
    }
  });

  return { elementRef, percent, scrollY };
}
