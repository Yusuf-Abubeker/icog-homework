FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

# Copy the rest of the application code into the container
COPY . .

CMD ["python", "app.py"]
