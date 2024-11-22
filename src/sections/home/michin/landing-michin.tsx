'use client';

import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';

import { useRouter } from 'src/routes/hooks';

import { MainLayout } from 'src/layouts/main';
import useAuthStore from 'src/store/AuthStore';
import { Footer } from 'src/layouts/main/footer';
import { useCityStore } from 'src/store/useCityStore';

import { BackToTop, MotionViewport } from 'src/components/animate';

import AlRescate from './AlRescate';
import Compromiso from './compromiso';
import Diferencia from './Diferencia';
import CitySelector from './CitySelector';
import { HomeHeroMichin } from './HomeHero';
import ExperienciasUnicas from './ExperienciasUnicas';
import AventurasSubmarinas from './AventurasSubmarinas';
import ExploraNuestroMundo from './ExploraNuestroMundo';
import DescubreNuestraDiversidad from './DescubreNuestraDiversidad';

// ----------------------------------------------------------------------

export function LandingMichin() {
  const [showSelectedCity, setShowSelectedCity] = useState(false);
  const { postLoginRedirectPath, setPostLoginRedirectPath } = useAuthStore();
  const { city } = useCityStore();
  const router = useRouter();

  useEffect(() => {
    if (city === '') {
      setShowSelectedCity(true);
    } else {
      setShowSelectedCity(false);
    }
    if (postLoginRedirectPath && postLoginRedirectPath.length > 0) {
      router.push(postLoginRedirectPath);
      setPostLoginRedirectPath('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [city]);

  if (showSelectedCity) return <CitySelector />;

  return (
    <MainLayout showSelectCity slotsDisplay={{ topArea: true }}>
      <MotionViewport>
        <BackToTop />
        <HomeHeroMichin />

        <Stack
          sx={{
            position: 'relative',
            borderColor: 'none',
            background: 'url(/assets/background/michin/bg-agua.png)',
            backgroundSize: 'cover',
            // 'linear-gradient(to bottom right, #287FA9 0%, #287FA9 12%, #246C9D 24%, #1D518B 36%, #1E2B62 50%) bottom right / 50% 100% no-repeat, linear-gradient(to bottom left, #287FA9 0%, #287FA9 12%, #246C9D 24%, #1D518B 36%, #1E2B62 50%) bottom left / 50% 100% no-repeat, linear-gradient(to top left, #287FA9 0%, #287FA9 12%, #246C9D 24%, #1D518B 36%, #1E2B62 50%) top left / 50% 100% no-repeat, linear-gradient(to top right, #287FA9 0%, #287FA9 12%, #246C9D 24%, #1D518B 36%, #1E2B62 50%) top right / 50% 100% no-repeat',
          }}
        >
          <AventurasSubmarinas />
          <DescubreNuestraDiversidad />
          <ExperienciasUnicas />
          <ExploraNuestroMundo />
          <AlRescate />
          <Compromiso />
          <Diferencia />
          <Footer showSelectCity />
        </Stack>
      </MotionViewport>
    </MainLayout>
  );
}
