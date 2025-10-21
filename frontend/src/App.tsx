import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

//axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function App() {
  const [username, setUsername] = useState('');
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const [step, setStep] = useState('register');
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/register',        
        { username: username },
        { responseType: 'blob'}
      );
      // The response is already a blob when responseType is set to 'blob'
      const imageUrl = URL.createObjectURL(response.data);
      setQrImage(imageUrl);
      setStep('verify');
      setMessage('Registration successful — scan the QR code');
    } catch (err) {
      // The error response is a blob, so we need to convert it to JSON
      if ((err as any).response && (err as any).response.data instanceof Blob) {
        const errorBlob = (err as any).response.data as Blob;
        const errorText = await errorBlob.text();
        try {
          const errorJson = JSON.parse(errorText);
          if (errorJson.detail=="User already exists") {
            setStep('verify');
            return;
          }
          setMessage(errorJson.detail || 'Registration failed');
        } catch {
          setMessage(errorText || 'Registration failed');
        }
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    setLoading(true);
    try {
      const response = await axios.post('/api/verify', {
        username,
        token,
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage((err as any).response?.data?.detail || 'Verification failed');
    } finally {
      setLoading(false);
    }
  };

  // open snackbar whenever message changes
  useEffect(() => {
    if (message) setOpenSnackbar(true);
  }, [message]);

  return (
    <Container maxWidth="sm" sx={{ py: 6 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          🔐 2FA with FastAPI + Microsoft Authenticator
        </Typography>
      </Box>

      {step === 'register' && (
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', alignItems: 'center' }}>
          <TextField
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            size="small"
          />
            <Button variant="contained" onClick={handleRegister} disabled={loading}>
              {loading ? <CircularProgress color="inherit" size={20} /> : 'Register'}
            </Button>
        </Box>
      )}

      {step === 'verify' && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Typography>📲 Scan this QR code with Microsoft Authenticator:</Typography>
          {qrImage && <Avatar src={qrImage} alt="QR Code" sx={{ width: 160, height: 160 }} variant="square" />}

          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <TextField
              placeholder="Enter 6-digit code"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              inputProps={{ maxLength: 6 }}
              size="small"
            />
            <Button variant="contained" onClick={handleVerify} disabled={loading}>
              {loading ? <CircularProgress color="inherit" size={20} /> : 'Verify Code'}
            </Button>
          </Box>
        </Box>
      )}

      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={() => setOpenSnackbar(false)}>
        <Alert severity="info" sx={{ width: '100%' }} onClose={() => setOpenSnackbar(false)}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
