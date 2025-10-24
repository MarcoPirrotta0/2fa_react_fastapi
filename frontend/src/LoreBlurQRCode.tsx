import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Link,
  Divider,
  useTheme,
} from '@mui/material';

const LoreBlur: React.FC = () => {
  const wikiUrl = 'https://en.wikipedia.org/wiki/QR_code';
  const qrSrc = `https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${encodeURIComponent(
    wikiUrl
  )}`;
  const theme = useTheme();

  return (
    <Box sx={{ px: { xs: 1, sm: 3 }, py: 3 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2, sm: 4 },
          borderRadius: 3,
          borderLeft: `6px solid ${theme.palette.primary.main}`,
          backgroundColor: theme.palette.background.paper,
          maxWidth: '1000px',
          mx: 'auto',
        }}
      >
        <Grid
          container
          spacing={4}
          alignItems="center"
          justifyContent="center"
          direction={{ xs: 'column', md: 'row' }}
        >
          {/* QR Code on the LEFT */}
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: 'flex',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
            }}
          >
            <Box
              component="img"
              src={qrSrc}
              alt="QR code to Wikipedia QR code page"
              sx={{
                width: 200,
                height: 200,
                borderRadius: 1,
                boxShadow: 3,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: 6,
                },
              }}
            />
          </Grid>

          {/* Text content on the RIGHT */}
          <Grid item xs={12} md={8}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 600,
                textAlign: { xs: 'center', md: 'left' },
                color: theme.palette.text.primary,
              }}
            >
              QR Code Background
            </Typography>

            <Divider
              sx={{
                mb: 2,
                width: { xs: '60%', md: '40%' },
                mx: { xs: 'auto', md: 0 },
                borderColor: theme.palette.primary.main,
              }}
            />

            <Typography
              paragraph
              sx={{
                lineHeight: 1.8,
                textAlign: { xs: 'center', md: 'justify' },
              }}
            >
              The QR code (Quick Response Code) was invented in 1994 by Denso Wave,
              a subsidiary of Toyota Motor Corporation, in Japan to help track
              automotive parts more efficiently on the assembly line.
            </Typography>

            <Typography
              paragraph
              sx={{
                lineHeight: 1.8,
                textAlign: { xs: 'center', md: 'justify' },
              }}
            >
              Unlike traditional one-dimensional barcodes, which store data in only
              one direction, the QR code uses a two-dimensional matrix to encode
              much more information (including numbers, letters, and even Japanese
              characters), enabling fast, omnidirectional scanning.
            </Typography>

            <Typography
              paragraph
              sx={{
                lineHeight: 1.8,
                textAlign: { xs: 'center', md: 'justify' },
              }}
            >
              Over time, the QR code moved beyond manufacturing and found widespread
              use in logistics, retail, and advertising — and with the rise of
              smartphones, it exploded into everyday life: from menus and payment
              links to product tracking and digital content access.
            </Typography>

            <Typography
              paragraph
              sx={{
                lineHeight: 1.8,
                textAlign: { xs: 'center', md: 'justify' },
              }}
            >
              Because the inventors made the specification open for licensing, the
              QR code became a global standard (ISO/IEC 18004) and remains one of
              the most popular ways to link the physical world with digital data.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Source:{' '}
              <Link href={wikiUrl} target="_blank" rel="noopener noreferrer">
                Wikipedia — QR code
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LoreBlur;
