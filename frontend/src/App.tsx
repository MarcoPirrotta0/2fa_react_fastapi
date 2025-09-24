import { useState } from 'react';
import axios from 'axios';

//axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function App() {
  const [username, setUsername] = useState('');
  const [qrImage, setQrImage] = useState<string | null>(null);
  const [token, setToken] = useState('');
  const [step, setStep] = useState('register');
  const [message, setMessage] = useState('');

  const handleRegister = async () => {
    try {
      const response = await axios.post('/api/register',        
        { username: username },
        { responseType: 'blob'}
      );
      // The response is already a blob when responseType is set to 'blob'
      const imageUrl = URL.createObjectURL(response.data);
      setQrImage(imageUrl);
      setStep('verify');
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

    }
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post('/api/verify', {
        username,
        token,
      });

      setMessage(response.data.message);
    } catch (err) {
      setMessage((err as any).response?.data?.detail || 'Verification failed');
    }
  };

  return (
    <div
      style={{
        padding: 30,
        fontFamily: 'Arial',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>🔐 2FA with FastAPI + Microsoft Authenticator</h1>

      {step === 'register' && (
        <>
          <input
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: 10, width: 200 }}
          />
          <button onClick={handleRegister} style={{ marginLeft: 10, padding: 10 }}>
            Register
          </button>
        </>
      )}

      {step === 'verify' && (
        <>
          <p>📲 Scan this QR code with Microsoft Authenticator:</p>
          {qrImage && <img src={qrImage} alt="QR Code" style={{ marginBottom: 20 }} />}
          <br />
          <input
            placeholder="Enter 6-digit code"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            maxLength={6}
            style={{ padding: 10, width: 200 }}
          />
          <button onClick={handleVerify} style={{ marginLeft: 10, padding: 10 }}>
            Verify Code
          </button>
        </>
      )}

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}

export default App;
