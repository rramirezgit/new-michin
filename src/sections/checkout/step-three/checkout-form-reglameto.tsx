// src/sections/checkout/step-three/Reglamento.tsx

import React from 'react';

import { Typography, Card, CardContent, ListItemText } from '@mui/material';

const reglamentoTextos = [
  'Niños a partir de 1 año se debe pagar su acceso.',
  'No hay cancelaciones o devoluciones.',
  'Nuestro boleto solo permite acceder una vez a las instalaciones.',
  'No está autorizado fumar dentro de nuestras instalaciones.',
  'El horario de las actividades de Michin Extremo será de apertura 12:00 al cierre 19:00 horas.',
  'Respetar la delimitación de marcas, perímetros o accesos restringidos dentro del Acuario.',
  'Todas las actividades de Michin Extremos se deberán realizar siguiendo las indicaciones del reglamento y del miembro del staff encargado.',
  'Sin excepción alguna, los visitantes deberán atender las instrucciones del personal del Acuario.',
  'Puntualidad en el horario de las interacciones compradas como: Inmersión de rayas, alimentación de rayas, cocodrilos, avistamiento tiburón, talleres Michin, fotografía con especie, etc.',
  'En situaciones de contingencia, los visitantes deberán seguir las instrucciones del personal, así como hacer caso a los señalamientos de Protección Civil.',
  'Las actividades se podrán suspender en caso de acontecimientos que por su naturaleza impidan la realización de las actividades de forma segura (Sismos, ráfagas de viento, lluvia o tormenta eléctrica, fallo eléctrico, etc.).',
  'Para el uso de todas las actividades de Michin Extremo, se deberá cubrir los requisitos médicos, físicos y de vestimenta adecuados para realizarlos.',
  'Se restringe el acceso de mascotas a las instalaciones.',
  'Está prohibido el acceso con alimentos y bebidas.',
  'Nos reservamos el derecho de admisión a personas en estado inconveniente.',
];

const Reglamento = ({ id }: { id: string }) => (
  <Card sx={{ mb: 3, backgroundColor: 'rgba(145, 158, 171, 0.05)' }} id={id}>
    <CardContent>
      <Typography
        sx={{
          color: '#1E2B62',
          textOverflow: 'ellipsis',
          fontFamily: 'Futura Hv BT',
          fontSize: '24px',
          fontStyle: 'normal',
          fontWeight: '400',
          mb: 1,
        }}
      >
        Reglamento
      </Typography>
      <ul style={{ listStyleType: 'none', paddingLeft: '5px' }}>
        {reglamentoTextos.map((texto, index) => (
          <li key={index} style={{ position: 'relative', paddingLeft: '15px' }}>
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                width: '4px',
                height: '4px',
                backgroundColor: '#808A94',
                borderRadius: '50%',
              }}
            />
            <ListItemText
              primary={
                <Typography
                  sx={{
                    color: '#808A94',
                    fontFamily: 'Futura Md BT',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '25px',
                  }}
                >
                  {texto}
                </Typography>
              }
            />
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

export default Reglamento;
