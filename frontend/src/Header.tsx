import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  useTheme,
  Box,
  Container,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const Header: React.FC = () => {
  const theme = useTheme();

  return (
<Box
  component="header"
  sx={{
    width: "100vw",
    position: "relative",
    left: "50%",
    right: "50%",
    marginLeft: "-50vw",
    marginRight: "-50vw",

    // Fade from primary color to white, more space at the bottom
    background: `linear-gradient(180deg, 
      ${theme.palette.primary.main} 50%, 
      #ffffff 100%)`,

    color: theme.palette.getContrastText(theme.palette.primary.main),
    pb: 7,           // increase bottom padding for more fade space
    pt: 2,            // optional top padding
    minHeight: 350,   // ensures header is tall enough
  }}
>


      {/* Transparent AppBar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "transparent",
          boxShadow: "none",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: 0.6,
            }}
          >
            LOGIN CODE GENERATOR EXAMPLE
          </Typography>

          <Tooltip title="Original Repository Link">
            <IconButton
  aria-label="github"
  component="a"
  href="https://github.com/UnibsMatt/2fa_react_fastapi"
  target="_blank"
  rel="noopener noreferrer"
  sx={{
    color: "white",
    "&:hover": {
      color: theme.palette.primary.light, // change to blue
    },
  }}
>
  <GitHubIcon />
</IconButton>

          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Subtitle and body below the toolbar */}
      <Container maxWidth="md" sx={{ mt: 2, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            mb: 1,
            textShadow: "0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
        Secure Login Demo
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            mb: 2,
            opacity: 0.9,
          }}
        >
          A practical demonstration of two-factor authentication (2FA)
          integration using React, FastAPI, and Microsoft Authenticator.
        </Typography>

        <Typography
          variant="body2"
          sx={{
            maxWidth: 700,
            mx: "auto",
            lineHeight: 1.8,
            opacity: 0.85,
          }}
        >
          This project showcases a secure and user-friendly login experience
          powered by two-factor authentication (2FA). It demonstrates how to
          generate and verify time-based one-time passwords (TOTP), link
          authentication apps using QR codes, and ensure safer user access
          through modern, industry-standard security practices.
        </Typography>
      </Container>
    </Box>
  );
};

export default Header;
