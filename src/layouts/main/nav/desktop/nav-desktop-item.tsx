import type { LinkProps } from '@mui/material/Link';

import { m } from 'framer-motion';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import CardActionArea from '@mui/material/CardActionArea';

import { RouterLink } from 'src/routes/components';

import { CONFIG } from 'src/config-global';
import { buttonFont } from 'src/theme/core';

import { Iconify } from 'src/components/iconify';
import { useNavItem } from 'src/components/nav-section/hooks';

import type { NavItemProps, NavItemStateProps } from '../types';

// ----------------------------------------------------------------------

interface NavItemProps2 extends NavItemProps {
  icon2?: React.ReactNode;
}

export const NavItem = forwardRef<HTMLButtonElement, NavItemProps2>(
  ({ title, path, open, active, hasChild, externalLink, subItem, icon2, ...other }, ref) => {
    const navItem = useNavItem({ path, hasChild, externalLink });

    return (
      <StyledNavItem
        disableRipple
        ref={ref}
        aria-label={title}
        open={open}
        active={active}
        subItem={subItem}
        {...navItem.baseProps}
        {...other}
      >
        <Box>{icon2}</Box>
        {title}

        {hasChild && <Iconify width={16} icon="iconamoon:arrow-down-2-duotone" sx={{ ml: 0.75 }} />}
      </StyledNavItem>
    );
  }
);

// ----------------------------------------------------------------------

const StyledNavItem = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'open' && prop !== 'subItem',
})<NavItemStateProps>(({ active, open, subItem, theme }) => {
  const rootItem = !subItem;

  const baseStyles = {
    item: {
      ...theme.typography.body2,
      fontWeight: theme.typography.fontWeightMedium,
      fontSize: theme.typography.pxToRem(16),
      fontFamily: buttonFont,
      transition: theme.transitions.create(['all'], {
        duration: theme.transitions.duration.shorter,
      }),
    },
    dot: {
      content: '""',
      bottom: '-2px',
      width: '100%',
      position: 'absolute',
      height: '5px',
      backgroundImage: "url('/assets/icons/subrayado.svg')",
      backgroundRepeat: 'no-repeat',
      ...(active && { opacity: 1, backgroundColor: theme.vars.palette.primary.main }),
    },
  };

  return {
    /**
     * Root item
     */
    ...(rootItem && {
      ...baseStyles.item,
      height: '100%',
      '&:hover': { opacity: 0.64, '&::before': baseStyles.dot },
      ...(active && {
        color: theme.vars.palette.primary.main,
        fontWeight: theme.typography.fontWeightSemiBold,
        '&::before': baseStyles.dot,
      }),
      ...(open && { opacity: 0.64, '&::before': baseStyles.dot }),
    }),

    /**
     * Sub item
     */
    ...(subItem && {
      ...baseStyles.item,
      justifyContent: 'flex-start',
      color: theme.vars.palette.text.secondary,
      fontSize: theme.typography.pxToRem(13),
      '&:hover': { color: theme.vars.palette.text.primary },
      ...(active && {
        color: theme.vars.palette.text.primary,
        fontWeight: theme.typography.fontWeightSemiBold,
      }),
    }),
  };
});

// ----------------------------------------------------------------------

type NavItemDashboardProps = LinkProps & {
  path: string;
};

export function NavItemDashboard({ path, sx, ...other }: NavItemDashboardProps) {
  return (
    <Link component={RouterLink} href={path} sx={{ width: 1, height: 1 }} {...other}>
      <CardActionArea
        sx={{
          height: 1,
          minHeight: 360,
          borderRadius: 1.5,
          color: 'text.disabled',
          bgcolor: 'background.neutral',
          px: { md: 3, lg: 10 },
          ...sx,
        }}
      >
        <m.div
          whileTap="tap"
          whileHover="hover"
          variants={{ hover: { scale: 1.02 }, tap: { scale: 0.98 } }}
        >
          <Box
            component="img"
            alt="illustration-dashboard"
            src={`${CONFIG.site.basePath}/assets/illustrations/illustration-dashboard.webp`}
            sx={{
              width: 640,
              objectFit: 'cover',
              aspectRatio: '4/3',
            }}
          />
        </m.div>
      </CardActionArea>
    </Link>
  );
}
