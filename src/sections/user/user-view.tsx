/* eslint-disable import/no-cycle */
/* eslint-disable perfectionist/sort-imports */

'use client';

import { Box, Stack, Container } from '@mui/material';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Iconify } from 'src/components/iconify';

import React from 'react';
import { Footer } from 'src/layouts/main/footer';
import { useTabs } from 'src/hooks/use-tabs';
import { UserNewEditForm } from './user-new-edit-form';
import TitleSeccion from '../home/michin/TitleSeccion';
import { UserTicket } from './user-ticket';

const TABS = [
  { value: 'general', label: 'General', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
  {
    value: 'billing',
    label: 'Mis Boletos',
    icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  },
];

// ----------------------------------------------------------------------

const UserView = () => {
  const tabs = useTabs('general');
  return (
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
      <Container
        sx={{
          mt: 5,
        }}
      >
        <TitleSeccion subtitle="CUENTA" title="mi perfil" />
        <Box sx={{ mb: 2 }}>
          <Tabs value={tabs.value} onChange={tabs.onChange}>
            {TABS.map((tab) => (
              <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
            ))}
          </Tabs>
        </Box>
        {tabs.value === 'general' && <UserNewEditForm />}

        {tabs.value === 'billing' && <UserTicket />}
      </Container>
      <Footer />
    </Stack>
  );
};

export default UserView;
