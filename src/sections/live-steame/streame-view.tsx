'use client';

import React from 'react';

import { Box, Stack, Container } from '@mui/material';

import { MainLayout } from 'src/layouts/main';
import { HomeFooter } from 'src/layouts/main/footer';

import HlsPlayer from './hls-player';

const StreamerMichin = () => (
  <MainLayout
    slotsDisplay={{
      car: false,
      store: false,
      rightAreaStart: false,
      topArea: false,
      signIn: false,
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
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 'calc(100vh - var(--layout-header-desktop-height))',
          }}
        >
          <HlsPlayer src={process.env.NEXT_PUBLIC_HLS_URL || ''} />
        </Box>
      </Container>
      <HomeFooter />
    </Stack>
  </MainLayout>
);

export default StreamerMichin;
