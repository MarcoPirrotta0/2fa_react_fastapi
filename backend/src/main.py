import sys
from fastapi import APIRouter, FastAPI, HTTPException, Form
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import pyotp
import qrcode
import io
from loguru import logger
import json
import os
from fastapi.middleware.cors import CORSMiddleware

logger.remove()
logger.add(sys.stderr, level="INFO") 
logger.info("Starting FastAPI application")

# Load users from file if it exists SECURITY RISK: this is not secure, we should use a database or a more secure storage !!! 
if os.path.exists("users.json"):
    users = json.load(open("users.json"))
else:
    users = {}


class RegisterRequest(BaseModel):
    username: str

class VerifyRequest(BaseModel):
    username: str
    token: str
    
router = APIRouter(
    prefix="/api",
)

@router.post("/register")
def register_user(req: RegisterRequest):
    logger.info(f"Registering user: {req.username}")
    if req.username in users:
        logger.error(f"User already exists: {req.username}")
        raise HTTPException(status_code=400, detail="User already exists")

    # Generate a secret for TOTP
    secret = pyotp.random_base32()
    logger.debug(f"Generated secret: {secret}")
    users[req.username] = {"secret": secret}
    # Create provisioning URI
    uri = pyotp.totp.TOTP(secret).provisioning_uri(name=req.username, issuer_name="MyFastAPIApp")
    logger.debug(f"Provisioning URI: {uri}")

    # Generate QR code as image in memory
    img = qrcode.make(uri)
    buf = io.BytesIO()
    img.save(buf, format='PNG')
    buf.seek(0)
    json.dump(users, open("users.json", "w"))

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
        return {"success": True, "message": "✅ 2FA verification successful"}
    else:
        logger.error(f"Invalid 2FA code for user: {req.username}")
        raise HTTPException(status_code=401, detail="❌ Invalid 2FA code")



app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(router)
