FROM python:3.10-slim

EXPOSE 8000

WORKDIR /app

RUN pip install poetry==2.1.3

COPY pyproject.toml poetry.lock ./

# Ensure critical dependencies are available even if poetry.lock is out of date
RUN pip install PyJWT python-jose

# Install runtime dependencies via pip as a fallback so uvicorn and FastAPI are present
RUN pip install fastapi uvicorn pyotp "qrcode[pil]" python-multipart loguru PyJWT python-jose

RUN poetry config virtualenvs.create false && poetry install --no-root || true

COPY ./src .

CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "error"]