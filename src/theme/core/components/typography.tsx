import type { Theme, Components } from '@mui/material/styles';

// ----------------------------------------------------------------------

const MuiTypography: Components<Theme>['MuiTypography'] = {
  /** **************************************
   * STYLE
   *************************************** */
  styleOverrides: {
    root: ({ theme }) => ({
      color: theme.palette.common.white, // color blanco para todo en el root
    }),
    paragraph: ({ theme }) => ({
      marginBottom: theme.spacing(2),
      color: theme.palette.common.white, // eliminado porque ya está en root
    }),
    gutterBottom: ({ theme }) => ({
      marginBottom: theme.spacing(1),
      color: theme.palette.common.white, // eliminado porque ya está en root
    }),
  },
};

// ----------------------------------------------------------------------

export const typography = { MuiTypography };
