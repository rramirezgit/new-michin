import React from 'react';
import Image from 'next/image';

import { Typography } from '@mui/material';

import { MInview } from './HomeHero';

interface TitleSeccionProps {
  subtitle?: string;
  title: string;
  description?: string;
  textAlign?: 'center' | 'left' | 'right';
}

const TitleSeccion = ({ subtitle, title, description, textAlign }: TitleSeccionProps) => (
  <MInview>
    <Typography
      variant="subtitle2"
      sx={{
        textAlign: textAlign || 'initial',
        fontSize: {
          xs: '8px',
          sm: '10px',
          md: '12px',
          lg: '14px',
        },
      }}
    >
      {subtitle && (
        <Image
          src="/assets/icons/landing/ic-start.svg"
          alt="topAventurasSubmarinas"
          width={19}
          height={19}
          style={{ marginRight: '6px', textAlign: textAlign || 'initial' }}
        />
      )}
      {subtitle}
    </Typography>
    <Typography variant="h2" style={{ textAlign: textAlign || 'initial' }}>
      {title}
    </Typography>
    {description && (
      <Typography variant="subtitle2" style={{ textAlign: textAlign || 'initial' }}>
        {description}
      </Typography>
    )}
  </MInview>
);

export default TitleSeccion;
