FROM python:3.8.4

WORKDIR /gobar

COPY . .

ENV PYTHONPATH ./backend/app

RUN apt update

RUN pip3 install fastapi uvicorn tortoise-orm passlib pyjwt python-multipart bcrypt pydub asyncpg

#CMD ["uvicorn", "backend.app.gobarbra3:app", "--host", "0.0.0.0", "--port", "8000"
