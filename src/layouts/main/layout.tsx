'use client';

import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useState, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { SplashScreen } from 'src/components/loading-screen';

import { Main } from './main';
import { NavMobile } from './nav/mobile';
import { NavDesktop } from './nav/desktop';
import { HeaderBase } from '../core/header-base';
import { LayoutSection } from '../core/layout-section';
import { navData as mainNavData } from '../config-nav-main';
import NavTopArea from './nav/desktop/nav-desktop-top-area/nav-desktop-top-area';

import type { NavMainProps } from './nav/types';

// ----------------------------------------------------------------------

export type MainLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  data?: {
    nav?: NavMainProps['data'];
  };
  showSelectCity?: boolean;
  slotsDisplay?: {
    account?: boolean;
    helpLink?: boolean;
    contacts?: boolean;
    searchbar?: boolean;
    workspaces?: boolean;
    localization?: boolean;
    notifications?: boolean;
    purchase?: boolean;
    settings?: boolean;
    car?: boolean;
    store?: boolean;
    signIn?: boolean;
    topArea?: boolean;
    rightAreaStart?: boolean;
    topAreaHeight?: number;
  };
};

export function MainLayout({
  sx,
  data,
  children,
  showSelectCity = false,
  slotsDisplay,
}: MainLayoutProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const theme = useTheme();

  const mobileNavOpen = useBoolean();

  const layoutQuery: Breakpoint = 'md';

  const mdUp = useResponsive('up', 'md');

  const navData = data?.nav ?? mainNavData;

  if (!isMounted) {
    return <SplashScreen />;
  }
  return (
    <>
      <NavMobile
        data={navData}
        open={mobileNavOpen.value}
        onClose={mobileNavOpen.onFalse}
        showSelectCity={showSelectCity}
      />

      <LayoutSection
        /** **************************************
         * Header
         *************************************** */
        headerSection={
          <HeaderBase
            layoutQuery={layoutQuery}
            onOpenNav={mobileNavOpen.onTrue}
            slotsDisplay={{
              account: slotsDisplay?.account ?? false,
              helpLink: slotsDisplay?.helpLink ?? false,
              contacts: slotsDisplay?.contacts ?? false,
              searchbar: slotsDisplay?.searchbar ?? false,
              workspaces: slotsDisplay?.workspaces ?? false,
              localization: slotsDisplay?.localization ?? false,
              notifications: slotsDisplay?.notifications ?? false,
              purchase: slotsDisplay?.purchase ?? false,
              settings: slotsDisplay?.settings ?? false,
              car: slotsDisplay?.car ?? true,
              store: slotsDisplay?.store ?? true,
              signIn: slotsDisplay?.signIn ?? mdUp,
            }}
            slots={{
              topArea: slotsDisplay?.topArea ? (
                <NavTopArea showSelectCity={showSelectCity} />
              ) : null,
              rightAreaStart:
                slotsDisplay?.rightAreaStart ?? true ? (
                  <NavDesktop
                    data={navData}
                    sx={{
                      display: 'none',
                      [theme.breakpoints.up(layoutQuery)]: { mr: 2.5, display: 'flex' },
                    }}
                  />
                ) : null,
            }}
          />
        }
        /** **************************************
         * Footer
         *************************************** */
        footerSection={null}
        /** **************************************
         * Style
         *************************************** */
        sx={sx}
      >
        <Main>{children}</Main>
      </LayoutSection>
    </>
  );
}
