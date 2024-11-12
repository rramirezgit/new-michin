import React from 'react';

import { Box, Container, Typography, CircularProgress } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import { useCityStore } from 'src/store/useCityStore';

import { LocationSort } from './nav-desktop-select';

const NavTopArea = ({ showSelectCity = false }: { showSelectCity?: boolean }) => {
  const mdUp = useResponsive('up', 'md');

  const { setCity, city, schedulesByDay, loading } = useCityStore();

  return (
    <Container
      maxWidth="lg"
      sx={{
        backgroundColor: 'common.white',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: {
            xs: 'center',
            md: 'inherit',
          },
          height: 31,
          gap: 2,
        }}
      >
        <Typography variant="overline" color="common.darkBlue">
          {loading ? (
            <CircularProgress size={17} />
          ) : (
            `ABIERTO HOY ${schedulesByDay.accessOpen} - ${schedulesByDay.accessClose}`
          )}
        </Typography>
        {mdUp && showSelectCity && (
          <LocationSort
            location={city}
            onChange={(newValue) => setCity(newValue.value)}
            locationsOptions={[
              { value: 'CDMX', label: 'Acuario Ciudad de México' },
              { value: 'PUE', label: 'Acuario Puebla' },
              { value: 'GDL', label: 'Acuario Guadalajara' },
            ]}
          />
        )}
      </Box>
    </Container>
  );
};

export default NavTopArea;
