'use client';

import type { BoxProps } from '@mui/material/Box';

import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import { Typography, LinearProgress } from '@mui/material';

// ----------------------------------------------------------------------

type Props = BoxProps & {
  portal?: boolean;
};

export function SplashScreen({ portal = true, sx, ...other }: Props) {
  const content = (
    <Box sx={{ overflow: 'hidden' }}>
      <Box
        sx={{
          right: 0,
          backgroundImage: 'url(/assets/background/michin/bg-agua.png)',
          // background:
          // 'linear-gradient(to bottom right, #246C9D 3%, #1D518B 15%, #1E2B62 41%) bottom right / 50% 50% no-repeat, linear-gradient(to bottom left, #246C9D 3%, #1D518B 15%, #1E2B62 41%) bottom left / 50% 50% no-repeat, linear-gradient(to top left, #246C9D 3%, #1D518B 15%, #1E2B62 41%) top left / 50% 50% no-repeat, linear-gradient(to top right, #246C9D 3%, #1D518B 15%, #1E2B62 41%) top right / 50% 50% no-repeat;',
          width: 1,
          bottom: 0,
          height: 1,
          zIndex: 9998,
          display: 'flex',
          position: 'fixed',
          alignItems: 'center',
          justifyContent: 'center',
          ...sx,
        }}
        {...other}
      >
        <Box>
          <Typography
            sx={{
              color: '#FFF',
              textAlign: 'center',
              fontFamily: 'UPBOLTERS',
              fontSize: 25.175,
              fontStyle: 'normal',
              marginBottom: 2,
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: 0.286,
            }}
          >
            Cargando
          </Typography>
          <LinearProgress color="primary" sx={{ width: 1, maxWidth: 360 }} />
        </Box>
      </Box>
    </Box>
  );

  if (portal) {
    return <Portal>{content}</Portal>;
  }

  return content;
}
