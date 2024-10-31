import React, { useState } from 'react';

import { Tab, Box, Tabs, Typography } from '@mui/material';

import { buttonFont } from 'src/theme/core';

interface ImportantInfoProps {
  longDescription: string;
}

const ImportantInfo: React.FC<ImportantInfoProps> = ({ longDescription }) => {
  const [value, setValue] = useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  // Dividimos la descripción larga en líneas
  const descriptionLines = longDescription?.split('\n');

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{
          '& .MuiTabs-indicator': {
            display: 'none', // Ocultar la línea debajo del tab
          },
        }}
      >
        <Tab
          label="Descripción"
          sx={{
            '&.MuiButtonBase-root': {
              color: '#1D518B',
              fontWeight: 400,
              fontSize: '14px',
              fontFamily: buttonFont,
            },
          }}
        />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Typography
          color="#808A94"
          sx={{
            fontSize: '14px',
            fontFamily: buttonFont,
            fontWeight: 400,
          }}
        >
          Información importante a tener en cuenta
        </Typography>
        <ul
          style={{
            paddingLeft: '24px', // para que los puntos estén correctamente alineados
            listStyleType: 'disc', // estilo de lista para mostrar puntos
          }}
        >
          {descriptionLines.map((line, index) => (
            <li
              key={index}
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#808A94',
              }}
            >
              {line}
            </li>
          ))}
        </ul>
      </TabPanel>
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}
//
export default ImportantInfo;
