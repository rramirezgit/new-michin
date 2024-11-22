import React from 'react';

import { Box, Typography } from '@mui/material';

interface MenuSectionProps {
  Icon: React.FC<{ style?: React.CSSProperties }>;
  title: string;
  subtitle: string;
  href: string;
}

const MenuSection: React.FC<MenuSectionProps> = ({ Icon, title, subtitle, href }) => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px',
      borderRadius: '8px',
    }}
    onClick={() => {
      window.open(href, '_blank');
    }}
  >
    <Box
      sx={{
        width: '45px',
        height: '45px',
      }}
    >
      <Icon />
    </Box>
    <Box>
      <Typography
        sx={{
          color: '#FFF',
          fontFamily: 'Futura Hv BT',
          fontSize: '18px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: 'rgba(255, 255, 255, 0.70)',
          fontFamily: 'Futura Bk BT',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  </Box>
);

export default MenuSection;
