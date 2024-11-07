'use client';

import Image from 'next/image';
import { m } from 'framer-motion';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { MainLayout } from 'src/layouts/main';
import { Footer } from 'src/layouts/main/footer';

import { varBounce, MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

export function NotFoundView() {
  const router = useRouter();
  const smUp = useResponsive('up', 'sm');
  const image = (
    <img
      src="/assets/background/michin/404.svg"
      alt="404"
      style={{ width: '40%', position: 'absolute', top: '0px', right: '0px' }}
    />
  );

  const imageMobile = (
    <img
      src="/assets/background/michin/404.svg"
      alt="404"
      style={{
        width: '100%',
        position: 'relative',
        top: '0px',
        right: '-30px',
        marginTop: '20px',
        marginBottom: '20px',
      }}
    />
  );
  return (
    <MainLayout
      slotsDisplay={{
        store: false,
        car: false,
        account: false,
        signIn: false,
        rightAreaStart: false,
      }}
    >
      <Stack
        sx={{
          position: 'relative',
          borderColor: 'none',
          mt: 'calc(var(--layout-header-desktop-height) * -1)',
          backgroundImage: 'url(/assets/background/michin/bg-agua.png)',
          paddingTop: 'calc(var(--layout-header-desktop-height) * 1)',
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        {smUp && image}

        <Container component={MotionContainer} sx={{ height: '70vh', zIndex: 1 }}>
          <m.div variants={varBounce().in}>
            <Typography
              sx={{
                fontSize: { xs: '100px', md: '220px' },
                lineHeight: 1,
                textAlign: { xs: 'center', md: 'left' },
                mt: { xs: 5, md: 10 },
                fontFamily: 'UPBOLTERS',
              }}
            >
              404
            </Typography>
          </m.div>
          <m.div variants={varBounce().in}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', md: 'flex-start' },
                width: '100%',
              }}
            >
              <Typography variant="h3" sx={{ mb: 2, textAlign: { xs: 'center', md: 'left' } }}>
                ¡Lo sentimos, esta página no está disponible!
              </Typography>
            </Box>
          </m.div>

          <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <Button
              variant="michin"
              onClick={() => router.push('/')}
              startIcon={
                <Image
                  src="/assets/icons/home/ic-right.svg"
                  width={31}
                  height={31}
                  alt="icon"
                  style={{
                    transform: 'rotate(206deg)',
                  }}
                />
              }
            >
              Volver a Home
            </Button>
          </Box>
          {!smUp && imageMobile}
        </Container>
        <Footer />
      </Stack>
    </MainLayout>
  );
}
