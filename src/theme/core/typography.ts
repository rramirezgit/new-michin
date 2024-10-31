import type { TypographyOptions } from '@mui/material/styles/createTypography';

import { setFont, pxToRem, responsiveFontSizes } from '../styles/utils';

// ----------------------------------------------------------------------

declare module '@mui/material/styles' {
  interface TypographyVariants {
    fontSecondaryFamily: React.CSSProperties['fontFamily'];
    fontWeightSemiBold: React.CSSProperties['fontWeight'];
  }
  interface TypographyVariantsOptions {
    fontSecondaryFamily?: React.CSSProperties['fontFamily'];
    fontWeightSemiBold?: React.CSSProperties['fontWeight'];
  }
  interface ThemeVars {
    typography: Theme['typography'];
  }
}

// ----------------------------------------------------------------------

export const defaultFont = 'Futura Bk BT';

export const primaryFont = setFont(defaultFont);

export const secondaryFont = setFont('UPBOLTERS');

export const subtitleFont = setFont('Futura Md BT');
export const buttonFont = setFont('Futura Hv BT');
export const limitedUseFont = setFont('Futura-Bold');

// ----------------------------------------------------------------------

export const typography: TypographyOptions = {
  fontFamily: primaryFont,
  fontSecondaryFamily: secondaryFont,
  fontWeightLight: '300',
  fontWeightRegular: '400',
  fontWeightMedium: '500',
  fontWeightSemiBold: '600',
  fontWeightBold: '700',
  h1: {
    fontWeight: 400,
    fontSize: pxToRem(70.495),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ xs: 52, sm: 65, md: 68, lg: 70.495 }),
  },
  h2: {
    fontWeight: 400,
    fontSize: pxToRem(42),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ xs: 32, sm: 36, md: 40, lg: 42 }),
  },
  h3: {
    fontWeight: 400,
    fontSize: pxToRem(23),
    fontFamily: secondaryFont,
    ...responsiveFontSizes({ xs: 17, sm: 19, md: 21, lg: 23 }),
  },
  h4: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(20),
    fontFamily: subtitleFont,
    ...responsiveFontSizes({ xs: 14, sm: 16, md: 18, lg: 20 }),
  },
  h5: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    fontFamily: subtitleFont,
    ...responsiveFontSizes({ xs: 15, sm: 19, md: 20, lg: 20 }),
  },
  h6: {
    fontWeight: 600,
    lineHeight: 28 / 18,
    fontSize: pxToRem(17),
    fontFamily: subtitleFont,
    ...responsiveFontSizes({ xs: 10, sm: 18, md: 18, lg: 18 }),
  },
  subtitle1: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(18),
    ...responsiveFontSizes({ xs: 13, sm: 14, md: 15, lg: 18 }),
  },
  subtitle2: {
    fontWeight: 100,
    lineHeight: 22 / 14,
    fontSize: pxToRem(11),
    ...responsiveFontSizes({ xs: 13, sm: 14, md: 15, lg: 16 }),
  },
  body1: {
    lineHeight: 1.5,
    fontSize: pxToRem(16),
    fontFamily: primaryFont,
  },
  body2: {
    lineHeight: 22 / 14,
    fontSize: pxToRem(14),
    fontFamily: primaryFont,
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontFamily: primaryFont,
  },
  overline: {
    fontWeight: 400,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    fontFamily: limitedUseFont,
  },
  button: {
    fontWeight: 400,
    lineHeight: 24 / 14,
    fontSize: pxToRem(14),
    textTransform: 'unset',
    fontFamily: buttonFont,
  },
};
