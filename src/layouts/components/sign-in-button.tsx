import type { ButtonProps } from '@mui/material/Button';

import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '@mui/material/Button';
import { Avatar, Popover, MenuItem, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import useAuthStore from 'src/store/AuthStore';
import { useUserStore } from 'src/store/UserStore';

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  return (
    <Button component={RouterLink} href={paths.auth.login} variant="outlined" sx={sx} {...other}>
      Sign in
    </Button>
  );
}

// ----------------------------------------------------------------------

export function SignInIconButton({ sx, ...other }: ButtonProps) {
  const { isAuthenticated: isAuthenticatedAuth0, logout: logoutAuth0 } = useAuth0();
  const { isAuthenticated, logout } = useAuthStore();
  const { user } = useUserStore();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    logoutAuth0();
    navigate.refresh();
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton
        component={RouterLink}
        href={isAuthenticated || isAuthenticatedAuth0 ? '#' : paths.michin.user.profile}
        sx={sx}
        {...other}
        onClick={isAuthenticated || isAuthenticatedAuth0 ? handleClick : () => {}}
      >
        <Avatar
          src={user?.avatar || '/assets/icons/navbar/ic-login.svg'}
          alt={user?.name || ''}
          sx={{ width: 25, height: 25 }}
        />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem onClick={() => navigate.push(paths.michin.user.profile)}>
          <Typography
            sx={{
              color: '#1E2B62',
            }}
          >
            Mi Cuenta
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <Typography sx={{ color: '#1E2B62' }}>Cerrar Sesión</Typography>
        </MenuItem>
      </Popover>
    </>
  );
}
