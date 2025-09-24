# 2FA React FastAPI

A modern Two-Factor Authentication (2FA) application built with React frontend and FastAPI backend, featuring QR code generation for authenticator apps like Microsoft Authenticator.

## 🚀 Features

- **User Registration**: Register users with unique usernames
- **QR Code Generation**: Automatic QR code generation for authenticator app setup
- **TOTP Verification**: Time-based One-Time Password verification
- **Modern UI**: Clean React interface with TypeScript
- **Docker Support**: Full containerization with Docker Compose
- **CORS Enabled**: Cross-origin resource sharing for development

## 🏗️ Architecture

- **Frontend**: React 19 + TypeScript + Vite
- **Backend**: FastAPI + Python 3.10+
- **2FA Library**: PyOTP for TOTP generation and verification
- **QR Code**: QRCode library for authenticator app integration
- **Containerization**: Docker + Docker Compose

## 📋 Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.10+ (for local development)

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Clone and navigate to the project:**
   ```bash
   cd 2fa_react_fastapi
   ```

2. **Build and run with Docker Compose:**
   ```bash
   make build
   make run
   ```
   
   Or manually:
   ```bash
   docker compose build
   docker compose up -d
   ```

3. **Access the application:**
   - Frontend: http://localhost:80
   - Backend API: Available at the backend container

### Local Development

#### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies with Poetry:**
   ```bash
   poetry install
   ```

3. **Run the FastAPI server:**
   ```bash
   poetry run uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Access the application:**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:8000

## 📖 Usage

1. **Register a User:**
   - Enter a username in the registration form
   - Click "Register" to generate a QR code

2. **Setup Authenticator:**
   - Scan the QR code with Microsoft Authenticator (or any TOTP app)
   - The app will generate 6-digit codes every 30 seconds

3. **Verify Authentication:**
   - Enter the 6-digit code from your authenticator app
   - Click "Verify Code" to complete authentication

## 🔧 API Endpoints

### POST `/api/register`
Register a new user and generate QR code.

**Request:**
```json
{
  "username": "string"
}
```

**Response:** PNG image (QR code)

### POST `/api/verify`
Verify a 2FA token.

**Request:**
```json
{
  "username": "string",
  "token": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "✅ 2FA verification successful"
}
```

## 🛠️ Development

### Project Structure
```
2fa_react_fastapi/
├── backend/
│   ├── src/
│   │   └── main.py          # FastAPI application
│   ├── pyproject.toml       # Python dependencies
│   └── Dockerfile           # Backend container config
├── frontend/
│   ├── src/
│   │   ├── App.tsx          # React main component
│   │   └── main.tsx         # React entry point
│   ├── package.json         # Node.js dependencies
│   └── Dockerfile           # Frontend container config
├── docker-compose.yaml      # Multi-container setup
└── makefile                 # Build automation
```

### Dependencies

**Backend:**
- FastAPI: Web framework
- PyOTP: TOTP generation and verification
- QRCode: QR code generation
- Uvicorn: ASGI server
- Loguru: Logging

**Frontend:**
- React 19: UI framework
- TypeScript: Type safety
- Vite: Build tool and dev server
- Axios: HTTP client
- ESLint: Code linting

## 🔒 Security Notes

⚠️ **Important Security Considerations:**

- This is a **demo application** for educational purposes
- User data is stored in a simple JSON file (`users.json`) - **NOT suitable for production**
- For production use, implement:
  - Proper database storage
  - User session management
  - Rate limiting
  - Input validation and sanitization
  - HTTPS enforcement
  - Secure secret storage

## 🐳 Docker Configuration

The application uses multi-stage Docker builds:

- **Backend**: Python 3.10 with Poetry for dependency management
- **Frontend**: Node.js with Vite for React build
- **Nginx**: Serves the frontend and proxies API requests

## 📝 Scripts

### Makefile Commands
- `make build`: Build Docker images
- `make run`: Build and run containers

### Frontend Scripts
- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is for educational purposes. Please ensure you understand the security implications before using in production.

## 🆘 Troubleshooting

### Common Issues

1. **Port conflicts**: Ensure ports 80 and 8000 are available
2. **Docker issues**: Try `docker compose down` and rebuild
3. **CORS errors**: Check that the backend is running and accessible
4. **QR code not displaying**: Verify the backend is generating images correctly

### Logs

Check container logs:
```bash
docker compose logs backend
docker compose logs frontend
```

---

**Built with ❤️ using React, FastAPI, and Docker**
