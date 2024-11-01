import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import Image from 'next/image';
import * as IconsSocials from '#/assets/icons/socials';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { Button, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { pxToRem } from 'src/theme/styles';
import { buttonFont } from 'src/theme/core';
import { useCityStore } from 'src/store/useCityStore';

import { Logo } from 'src/components/logo';
import ButtonMichin from 'src/components/btn-michin';

export const socialMedias = [
  {
    Icon: IconsSocials.icFacebook,
    href: 'https://www.facebook.com/AcuarioMichin',
  },
  {
    Icon: IconsSocials.icInstagram,
    href: 'https://www.instagram.com/acuariomichin/',
  },
  {
    Icon: IconsSocials.icX,
    href: 'https://x.com/AcuarioMichin',
  },
  {
    Icon: IconsSocials.icYoutube,
    href: 'https://www.youtube.com/@acuariomichin',
  },
];

// ----------------------------------------------------------------------

export type FooterProps = {
  layoutQuery?: Breakpoint;
  sx?: SxProps<Theme>;
  showSelectCity?: boolean;
};

export function Footer({ layoutQuery = 'md', sx, showSelectCity = false }: FooterProps) {
  const theme = useTheme();
  const { setCity, city } = useCityStore();
  const router = useRouter();

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        // background: 'linear-gradient(180deg, #1F2C64 0%, #050329 100%)',
        background: 'transparent',
        border: 'none',
        ...sx,
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          pb: 5,
          pt: 10,
          textAlign: 'center',
          [theme.breakpoints.up(layoutQuery)]: { textAlign: 'unset' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            width: '100%',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Logo height={60} width={250} />
        </Box>

        <Grid
          container
          sx={{
            mt: 3,
            justifyContent: 'center',
            [theme.breakpoints.up(layoutQuery)]: { justifyContent: 'space-between' },
          }}
        >
          <Grid {...{ xs: 12 }}>
            <Stack
              spacing={5}
              sx={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                [theme.breakpoints.down(layoutQuery)]: {
                  flexDirection: 'column',
                  alignItems: 'center',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontFamily: buttonFont,
                    mb: '10px',
                  }}
                >
                  CONTACTO
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '25px',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: pxToRem(14),
                      display: 'flex',
                      alignItems: 'center', // Improved alignment for the icon
                    }}
                  >
                    <Image
                      src="/assets/icons/home/ic-mail.svg"
                      alt="mail icon"
                      width={20}
                      height={20}
                      style={{ marginRight: 10 }}
                    />
                    contactocdmx.michin@gmail.com
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: pxToRem(14),
                      display: 'flex',
                      alignItems: 'center', // Improved alignment for the icon
                    }}
                  >
                    <Image
                      src="/assets/icons/home/ic-cel.svg"
                      alt="phone icon"
                      width={20}
                      height={20}
                      style={{ marginRight: 10 }}
                    />
                    55 9421 8850
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: pxToRem(14),
                      display: 'flex',
                      maxWidth: '250px',
                    }}
                  >
                    <Image
                      src="/assets/icons/home/ic-location.png"
                      alt="phone icon"
                      width={20}
                      height={20}
                      style={{ marginRight: 6 }}
                    />
                    Calz. San Juan de Aragón 399, Granjas Modernas, Gustavo A. Madero, 07460 Ciudad
                    de México
                  </Typography>

                  <Box>
                    {socialMedias.map((social) => (
                      <IconButton key={social.href} href={social.href}>
                        <social.Icon width={48} height={48} />
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontFamily: buttonFont,
                    mb: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  horarios LOS 365 DÍAS DEL AÑO
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                    p: '10px 18px',
                    backgroundColor: 'rgba(26, 78, 142, 0.60)',
                    borderRadius: '15px',
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        fontWeight: 'bold',
                        alignItems: 'center',
                      }}
                    >
                      Lunes a Jueves
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Instalaciones: 10am a 20pm
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Taquilla: 10am a 18pm
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        fontWeight: 'bold',
                        alignItems: 'center',
                      }}
                    >
                      Viernes
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Instalaciones: 10am a 21pm
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Taquilla: 10am a 19pm
                    </Typography>
                  </Box>

                  <Box>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        fontWeight: 'bold',
                        alignItems: 'center',
                      }}
                    >
                      Sábado y Domingo
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Instalaciones: 9am a 22pm
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: pxToRem(14),
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      Taquilla: 9am a 19pm
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontFamily: buttonFont,
                    mb: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  Explora
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '24px',
                  }}
                >
                  <Link href={paths.about} sx={{ display: 'block', color: 'white' }}>
                    Planifica tu visita
                  </Link>
                  <Link href={paths.contact} sx={{ display: 'block', color: 'white' }}>
                    Quienes somos
                  </Link>
                  <Link href={paths.faqs} sx={{ display: 'block', color: 'white' }}>
                    Conservación
                  </Link>
                  <Link href={paths.faqs} sx={{ display: 'block', color: 'white' }}>
                    Términos y condiciones
                  </Link>
                  <Link href={paths.faqs} sx={{ display: 'block', color: 'white' }}>
                    Aviso de privacidad
                  </Link>
                </Box>
              </Box>
              <Box>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontFamily: buttonFont,
                    mb: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  Boletos
                </Typography>
                <Typography
                  sx={{
                    fontSize: pxToRem(14),
                    display: 'flex',
                    alignItems: 'center', // Improved alignment for the icon
                  }}
                >
                  Compra tu boleto online
                </Typography>
                <ButtonMichin
                  h={40}
                  icon="/assets/icons/home/ic-right.svg"
                  color="common.darkBlue"
                  InitialBgColor={theme.palette.secondary.main}
                  hoverBgColor={theme.palette.primary.main}
                  border="none"
                  onClick={() => {
                    router.push(paths.michin.tickets);
                  }}
                  sx={{
                    fontSize: {
                      xs: '12px',
                      sm: '14px',
                    },
                    mt: 1,
                  }}
                >
                  Comprar boletos
                </ButtonMichin>
                <Box sx={{ display: 'flex', gap: '10px', mt: 1, justifyContent: 'center' }}>
                  <Box
                    sx={{
                      color: 'white',
                      fontSize: '20px',
                      mt: 2,
                      backgroundColor: 'white',
                      width: '50px',
                      height: '30px',
                      borderRadius: '5px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src="/assets/icons/home/ic-master.svg"
                      alt="qr code"
                      width={30}
                      height={40}
                    />
                  </Box>
                  <Box
                    sx={{
                      color: 'white',
                      fontSize: '20px',
                      width: '50px',
                      height: '30px',
                      borderRadius: '5px',
                      mt: 2,
                      backgroundColor: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <Image
                      src="/assets/icons/home/ic-visa.svg"
                      alt="qr code"
                      width={40}
                      height={50}
                    />
                  </Box>
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        {showSelectCity && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                sm: 'column',
                md: 'row',
              },
              gap: '10px',
              justifyContent: 'center',
              mt: 5,
            }}
          >
            <Button
              variant="michin"
              onClick={() => setCity('CDMX')}
              startIcon={
                <Image src="/assets/icons/home/ic-tortuga.svg" width={32} height={34} alt="icon" />
              }
              sx={{ justifyContent: 'flex-start', display: city === 'CDMX' ? 'none' : '' }}
            >
              Acuario Michin Ciudad de México
            </Button>
            <Button
              variant="michin"
              onClick={() => setCity('PUE')}
              startIcon={
                <Image src="/assets/icons/home/ic-medusa.svg" width={31} height={31} alt="icon" />
              }
              sx={{ justifyContent: 'flex-start', display: city === 'PUE' ? 'none' : '' }}
            >
              Acuario Michin Puebla
            </Button>
            <Button
              variant="michin"
              onClick={() => setCity('GDL')}
              startIcon={
                <Image src="/assets/icons/home/ic-pez.svg" width={31} height={31} alt="icon" />
              }
              sx={{ justifyContent: 'flex-start', display: city === 'GDL' ? 'none' : '' }}
            >
              Acuario Michin Guadalajara
            </Button>
          </Box>
        )}
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2" sx={{ mt: 5 }}>
            {`Copyright © ${new Date().getFullYear()} Todos los derechos reservados.`}{' '}
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'secondary.main', fontWeight: 'bold' }}
            >
              Acuario Michin
            </Typography>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// ----------------------------------------------------------------------

export type HomeFooterProps = {
  sx?: SxProps<Theme>;
};

export function HomeFooter({ sx }: HomeFooterProps) {
  const smUp = useResponsive('up', 'sm');
  return (
    <Box
      sx={{
        backgroundColor: '#111836',
        textAlign: 'center',
        padding: '4px 0',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: {
            xs: 'column-reverse',
            sm: 'row',
          },
          justifyContent: 'space-between',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            fontFamily: 'Futura Bk BT',
            fontSize: {
              xs: '12px',
              sm: '14px',
            },
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: 'normal',
            letterSpacing: '0.36px',
          }}
        >
          Copyright © {new Date().getFullYear()} Todos los derechos reservados.{' '}
          <Typography
            component="a"
            href="#"
            sx={{
              color: '#FFCE07',
              fontFamily: 'Futura Hv BT',
              fontSize: {
                xs: '12px',
                sm: '14px',
              },
              textDecoration: 'none',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
              letterSpacing: '0.36px',
            }}
          >
            Acuario Michin
          </Typography>
        </Typography>
        <Box>
          {socialMedias.map((social) => (
            <IconButton key={social.href} href={social.href}>
              <social.Icon width={smUp ? 44 : 40} height={smUp ? 44 : 40} />
            </IconButton>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
