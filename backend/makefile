build:
	docker build -t 2fa-react-fastapi .
run: build
	docker run -d -p 8000:8000 2fa-react-fastapi

dev:
	poetry run uvicorn src.main:app --host 0.0.0.0 --port 8000 --log-level error