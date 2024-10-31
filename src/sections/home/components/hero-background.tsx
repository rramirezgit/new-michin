/* eslint-disable import/order */
import type { Theme, SxProps } from '@mui/material/styles';

import Image from 'next/image';
import bgDesktop from '#/assets/background/michin/bg-michin.png';
import bgMobile from '#/assets/background/michin/bg-michin-m.png';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { useResponsive } from 'src/hooks/use-responsive';

import { MotionContainer } from 'src/components/animate';

// ----------------------------------------------------------------------

type Props = {
  sx?: SxProps<Theme>;
};

export function HeroBackground({ sx }: Props) {
  const upMd = useResponsive('up', 'sm');

  return (
    <Stack
      component={MotionContainer}
      alignItems="center"
      justifyContent="center"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        position: 'absolute',
        background: 'linear-gradient(to top, #1E2B62 0%, #1D518B 30%, #246C9D 60%, #287FA9 100%)',
      }}
    >
      <Box
        sx={{
          background:
            'linear-gradient(180deg, rgba(30, 43, 98, 0.95) 5%, rgba(30, 43, 98, 0.00) 30%);',
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          zIndex: 0,
          top: 0,
        }}
      />

      <Image
        alt="Michin"
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
        }}
        src={upMd ? bgDesktop : bgMobile}
      />
    </Stack>
  );
}
