import { Box, Typography } from '@mui/material';

export default function HeaderSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px', mb: '20px' }}>
      <Typography
        gutterBottom
        sx={{
          color: 'common.darkerBlue',
          fontFamily: 'UPBOLTERS',
          fontSize: 24,
          fontWeight: 400,
          lineHeight: 'normal',
          marginBottom: '0px',
        }}
      >
        {title}
      </Typography>
      <Typography
        gutterBottom
        sx={{
          fontFamily: 'Futura Md BT',
          color: 'common.darkerBlue',
          fontSize: 15,
          fontWeight: 400,
          lineHeight: 'normal',
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}
