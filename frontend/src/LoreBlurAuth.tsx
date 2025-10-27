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


import authLogo from '../faviconsecurity.png';

const LoreBlurAuth: React.FC = () => {
  const infoUrl = 'https://www.microsoft.com/en-us/security/business/security-101/what-is-two-factor-authentication-2fa';
  const authLogoSrc = authLogo; 
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
              src={authLogoSrc}
              alt="Microsoft Authenticator logo"
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
              Two-Factor Authentication (2FA) & Microsoft Authenticator
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
              Two-factor authentication (2FA) is a security method that requires two distinct forms of identification when accessing resources and data — for example, something you know (a password) and something you have (a trusted device).
            </Typography>

            <Typography
              paragraph
              sx={{
                lineHeight: 1.8,
                textAlign: { xs: 'center', md: 'justify' },
              }}
            >
              Enabling 2FA significantly reduces the risk of unauthorized access, because even if a password is compromised, an attacker still needs the second factor (such as your smartphone) to sign in.
            </Typography>

            <Typography
              paragraph
              sx={{
                lineHeight: 1.8,
                textAlign: { xs: 'center', md: 'justify' },
              }}
            >
              The Microsoft Authenticator app supports 2FA and beyond — allowing you to approve sign-ins via push notifications, generate one-time codes, or even go completely passwordless.
            </Typography>

            <Typography
              variant="body2"
              sx={{
                mt: 1,
                color: 'text.secondary',
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              Source:{''}
              <Link href={infoUrl} target="_blank" rel="noopener noreferrer">
                Microsoft – What is two-factor authentication?
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default LoreBlurAuth;
