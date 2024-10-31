/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Portal from '@mui/material/Portal';
import { useTheme } from '@mui/material/styles';

import { usePathname } from 'src/routes/hooks';
import { isExternalLink } from 'src/routes/utils';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import { CONFIG } from 'src/config-global';
import { useMenuStore } from 'src/store/menu';

import { NavLi, NavUl } from 'src/components/nav-section';

import { NavItem } from './nav-desktop-item';

import type { NavListProps } from '../types';

// ----------------------------------------------------------------------

export function NavList({ data }: NavListProps) {
  const theme = useTheme();

  const navItemRef = useRef<HTMLButtonElement | null>(null);

  const pathname = usePathname();

  // const [openMenu, setOpenMenu] = useState(false);

  const openMenu = useMenuStore((state) => state.openMenu);
  const setOpenMenu = useMenuStore((state) => state.setOpenMenu);

  const active = useActiveLink(data.path, !!data.children);

  const [clientRect, setClientRect] = useState<Record<string, number>>({ top: 0, height: 0 });

  useEffect(() => {
    if (openMenu) {
      handleCloseMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu(true);
    }
  }, [data.children, setOpenMenu]);

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
  }, []);

  const renderNavItem = (
    <NavItem
      ref={navItemRef}
      sx={{
        color: 'white',
      }}
      // slots
      title={data.title}
      path={data.path}
      icon2={data.icon2}
      // state
      active={active}
      hasChild={!!data.children}
      open={data.children && !!openMenu}
      externalLink={isExternalLink(data.path)}
      // action
      onMouseEnter={handleOpenMenu}
      onMouseLeave={handleCloseMenu}
    />
  );

  const handleGetClientRect = useCallback(() => {
    const element = navItemRef.current;

    if (element) {
      const rect = element.getBoundingClientRect();
      setClientRect({ top: rect.top, height: rect.height });
    }
  }, []);

  useEffect(() => {
    handleGetClientRect();

    window.addEventListener('scroll', handleGetClientRect);

    return () => {
      window.removeEventListener('scroll', handleGetClientRect);
    };
  }, [handleGetClientRect]);

  if (data.children) {
    return (
      <NavLi sx={{ height: 1 }}>
        {renderNavItem}

        {openMenu && (
          <Portal>
            <Fade in>
              <Box
                onMouseEnter={handleOpenMenu}
                onMouseLeave={handleCloseMenu}
                sx={{
                  pt: 0.5,
                  left: 0,

                  right: 0,
                  mx: 'auto',
                  position: 'fixed',
                  zIndex: theme.zIndex.modal,
                  height: '100%',
                  top: Math.round(clientRect.top + clientRect.height),
                }}
              >
                <Box
                  component="nav"
                  sx={{
                    padding: theme.spacing(0.5),
                    borderRadius: 0,
                    position: 'relative',
                    display: 'flex',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'linear-gradient(180deg, #122A4B 0%, #050329 100%)',
                    height: 'calc(100% - 70px)',
                    p: theme.spacing(5, 1, 1, 4),
                  }}
                >
                  <NavUl
                    sx={{
                      gap: 3,
                      width: 1,
                      flexWrap: 'wrap',
                      flexDirection: 'row',
                      height: '100%',
                      maxWidth: theme.breakpoints.values.lg,
                    }}
                  >
                    {data.children}
                  </NavUl>
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: 251,
                      height: 218,
                      backgroundImage: `url(${CONFIG.site.basePath}/assets/ElementosgraficosMichin/ElementosGraficos/AnimalesPlantas/leftMenu.png)`,
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 162,
                      height: 202,
                      backgroundImage: `url(${CONFIG.site.basePath}/assets/ElementosgraficosMichin/ElementosGraficos/AnimalesPlantas/rigthMenu.png)`,
                      backgroundRepeat: 'no-repeat',
                    }}
                  />
                </Box>
              </Box>
            </Fade>
          </Portal>
        )}
      </NavLi>
    );
  }

  return <NavLi sx={{ height: 1 }}>{renderNavItem}</NavLi>;
}
