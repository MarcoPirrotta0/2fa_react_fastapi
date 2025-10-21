import sys
from fastapi import APIRouter, FastAPI, HTTPException, Form, Depends
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import pyotp
import qrcode
import io
from loguru import logger
import json
import os
from fastapi.middleware.cors import CORSMiddleware

# New imports for authentication
import jwt
import datetime
from jose import JWTError, jwt as jose_jwt
from fastapi.security import OAuth2PasswordBearer

# -------------------------------------------------------
# Setup
# -------------------------------------------------------
logger.remove()
logger.add(sys.stderr, level="INFO")
logger.info("Starting FastAPI application")

# Load users from file (temporary storage)
if os.path.exists("users.json"):
    users = json.load(open("users.json"))
else:
    users = {}

# JWT setup
SECRET_KEY = "mysecretkey"  # ⚠️ For demo purposes only — use env var in production
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# -------------------------------------------------------
# Models
# -------------------------------------------------------
class RegisterRequest(BaseModel):
    username: str

class VerifyRequest(BaseModel):
    username: str
    token: str

# -------------------------------------------------------
# Router setup
# -------------------------------------------------------
router = APIRouter(prefix="/api")

# -------------------------------------------------------
# Helper function: verify JWT token
# -------------------------------------------------------
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jose_jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid authentication token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

# -------------------------------------------------------
# Routes
# -------------------------------------------------------

@router.post("/register")
def register_user(req: RegisterRequest):
    logger.info(f"Registering user: {req.username}")
    if req.username in users:
        logger.error(f"User already exists: {req.username}")
        raise HTTPException(status_code=400, detail="User already exists")

    # Generate a secret for TOTP
    secret = pyotp.random_base32()
    users[req.username] = {"secret": secret}

    # Create provisioning URI
    uri = pyotp.totp.TOTP(secret).provisioning_uri(name=req.username, issuer_name="MyFastAPIApp")

    # Generate QR code as image in memory
    img = qrcode.make(uri)
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)

    json.dump(users, open("users.json", "w"))
    logger.info(f"User {req.username} registered successfully.")

    return StreamingResponse(buf, media_type="image/png")


@router.post("/verify")
def verify_2fa(req: VerifyRequest):
    logger.info(f"Verifying 2FA for user: {req.username}")
    user = users.get(req.username)
    if not user:
        logger.error(f"User not found: {req.username}")
        raise HTTPException(status_code=404, detail="User not found")

    totp = pyotp.TOTP(user["secret"])
    if totp.verify(req.token, valid_window=1):
        logger.info(f"2FA verification successful for user: {req.username}")

        # Generate JWT token valid for 1 hour
        payload = {
            "sub": req.username,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

        return {
            "success": True,
            "message": "✅ 2FA verification successful",
            "token": token,
            "redirect": f"/user/{req.username}"
        }
    else:
        logger.error(f"Invalid 2FA code for user: {req.username}")
        raise HTTPException(status_code=401, detail="❌ Invalid 2FA code")


@router.get("/user/{username}")
def get_user(username: str, current_user: str = Depends(verify_token)):
    """Protected route — only accessible by the logged-in user."""
    if username != current_user:
        raise HTTPException(status_code=403, detail="Access forbidden: not your page")
    return {"message": f"Welcome, {username}! This is your personal page 🎉"}

# -------------------------------------------------------
# App setup
# -------------------------------------------------------
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # open CORS for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
