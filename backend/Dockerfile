FROM python:3.10-slim

EXPOSE 8000

WORKDIR /app

RUN pip install poetry==2.1.3

COPY pyproject.toml poetry.lock ./

RUN poetry config virtualenvs.create false && poetry install --no-root

COPY ./src .

CMD ["poetry", "run", "uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--log-level", "error"]