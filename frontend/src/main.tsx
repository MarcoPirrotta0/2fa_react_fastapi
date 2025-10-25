import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './Header.tsx';
import Sidebar from './Sidebar.tsx';
import LoreBlur from './LoreBlurQRCode.tsx';
import LoreBlurAuth from './LoreBlurAuth.tsx';
import MinorTitle from './minortitle.tsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Footer from './Footer.tsx';
import { Box } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: `'Oswald', system-ui, Avenir, Helvetica, Arial, sans-serif`,
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Sidebar />

      <Box id="top"><Header /></Box>
      <Box id="history"><LoreBlur /><LoreBlurAuth /></Box>
      <Box id="register"><MinorTitle /><App /></Box>
      <Box id="footer"><Footer /></Box>
    </ThemeProvider>
  </StrictMode>,
)
