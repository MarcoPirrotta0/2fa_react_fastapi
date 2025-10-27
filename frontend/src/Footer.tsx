import React from "react";
import { Box, Grid, Typography, Link, useTheme, Container } from "@mui/material";

const Footer: React.FC = () => {
  const theme = useTheme();

  return (
<Box
  component="footer"
  sx={{
    width: "100vw",      
    position: "relative",
    left: "50%",
    marginLeft: "-50vw",   
    pt: 20,
    pb: 1,
    mt: 8,
    color: theme.palette.getContrastText(theme.palette.primary.main),
    background: `linear-gradient(to bottom, 
      #ffffff 0%, 
      ${theme.palette.primary.main} 50%, 
      ${theme.palette.primary.dark || theme.palette.primary.main} 90%)`,
  }}
>

      <Container maxWidth="lg" sx={{ pb: 1 }}>
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="flex-start"
          direction={{ xs: "column", md: "row" }}
        >
  
          <Grid item xs={12} md={7}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                mb: 1,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Authenticator project
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                mb: 2,
                opacity: 0.9,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              Exploring Secure Authentication and QR Technology
            </Typography>

            <Typography
              variant="body2"
              sx={{
                lineHeight: 1.8,
                textAlign: { xs: "center", md: "justify" },
                maxWidth: 600,
                opacity: 0.9,
              }}
            >
              This project demonstrates modern authentication workflows combining
              QR code technology with two-factor authentication (2FA). Built using
              React, FastAPI, and Material-UI, it showcases how simple design and
              strong security can coexist in a seamless user experience.
            </Typography>
          </Grid>

 
          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              textAlign: { xs: "center", md: "right" },
            }}
          >
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1, textTransform: "uppercase" }}
            >
              Resources
            </Typography>

            <Link
              href="https://mui.com/"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ "&:hover": { color: theme.palette.secondary.light } }}
            >
              Material UI Official Site
            </Link>

            <Link
              href="https://github.com/UnibsMatt/2fa_react_fastapi"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ "&:hover": { color: theme.palette.secondary.light } }}
            >
              Original GitHub Repository
            </Link>

            <Link
              href="https://en.wikipedia.org/wiki/QR_code"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ "&:hover": { color: theme.palette.secondary.light } }}
            >
              Wikipedia — QR Code
            </Link>

            <Link
              href="https://www.microsoft.com/en-us/security/business/security-101/what-is-two-factor-authentication-2fa"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
              sx={{ "&:hover": { color: theme.palette.secondary.light } }}
            >
              Microsoft — Two-Factor Authentication
            </Link>
          </Grid>
        </Grid>
      </Container>


      <Box
        sx={{
          py: 2,
          backgroundColor: theme.palette.primary.dark || theme.palette.primary.main,
          textAlign: "center",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            opacity: 0.8,
            color: theme.palette.getContrastText(theme.palette.primary.dark || theme.palette.primary.main),
          }}
        >
          © {new Date().getFullYear()} Authenticator App — All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
