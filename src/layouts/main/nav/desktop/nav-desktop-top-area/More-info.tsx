import type { typeCity } from 'src/layouts/main/footer';

import React from 'react';
import Image from 'next/image';

import { Box, List, Button, ListItem, Typography } from '@mui/material';

import { paths, getFullPath } from 'src/routes/paths';

import { useCityStore } from 'src/store/useCityStore';

const MoreInfo = () => {
  const { city } = useCityStore();
  return (
    <Box
      sx={{
        background: 'rgba(26, 78, 142, 0.40)',
        color: '#FFFFFF',
        padding: 3,
        borderRadius: 2,
        maxWidth: '380px',
      }}
    >
      <Typography
        sx={{
          color: '#FFF',
          fontFamily: 'UPBOLTERS',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: 'normal',
          mb: '17px',
        }}
      >
        NECESITAS SABER
      </Typography>
      <Typography
        sx={{
          color: '#FFF',
          fontFamily: 'Futura-Bold',
          fontSize: '15px',
          fontStyle: 'normal',
          fontWeight: '500',
        }}
      >
        Prohibido ingresar con:
      </Typography>
      <List
        sx={{
          listStyleType: 'disc',
          paddingLeft: 4,
          color: '#FFF',
          fontFamily: 'Futura Md BT',
          fontSize: '15px',
          fontStyle: 'normal',
          fontWeight: '400',
          lineHeight: '23px',
        }}
      >
        <ListItem sx={{ display: 'list-item', marginBottom: '2px', padding: '0px' }}>
          Mascotas
        </ListItem>
        <ListItem sx={{ display: 'list-item', marginBottom: '2px', padding: '0px' }}>
          Alimentos y Bebidas
        </ListItem>
        <ListItem sx={{ display: 'list-item', marginBottom: '2px', padding: '0px' }}>
          Armas de fuego y Objetos punzantes
        </ListItem>
        <ListItem sx={{ display: 'list-item', marginBottom: '2px', padding: '0px' }}>
          Globos
        </ListItem>
        <ListItem sx={{ display: 'list-item', marginBottom: '2px', padding: '0px' }}>
          Triciclos, Bicicletas, Vehículos lúdicos electrónicos y motorizados.
        </ListItem>
      </List>
      <Typography
        sx={{
          color: '#FFF',
          fontFamily: 'Futura Md BT',
          fontSize: '15px',
          fontStyle: 'normal',
          lineHeight: '23px',
        }}
      >
        Se requiere calzado cerrado y seguro para actividades en Michin Extremo.
      </Typography>

      <Button
        variant="text"
        sx={{ marginTop: 2, color: '#00BFFF' }}
        startIcon={
          <Image src="/assets/icons/home/ic-right-blue.svg" width={31} height={31} alt="icon" />
        }
        href={getFullPath(paths[city as typeCity].politicasAccesos)}
      >
        Conocer todas las políticas
      </Button>
    </Box>
  );
};

export default MoreInfo;
