# Dockerized Flask and HTML Frontend Project

This project is a homework assignment from my trainer, aimed at building a web application using Docker. The task involves creating a backend using Python (Flask) and a frontend using HTML, both containerized using Docker.

## Project Structure

- **Backend**: A Flask API that handles comments.
- **Frontend**: A static HTML/CSS/JavaScript application served by Nginx.
- **Docker**: Docker and Docker Compose to containerize both the frontend and backend.

## Flask API

The backend API is built using Flask. It provides endpoints to manage comments.

### Endpoints

- `GET /comments`: Fetch all comments.
- `GET /comments/<comment_id>`: Fetch a specific comment by ID.
- `POST /comments`: Add a new comment.
- `PUT /comments/<comment_id>`: Update an existing comment.
- `DELETE /comments/<comment_id>`: Delete a comment.


## Frontend

The frontend is built using HTML, CSS, and JavaScript. It interacts with the Flask API to display and manage comments.

### Features

- Display list of comments
- Add new comment
- Edit existing comment
- Delete comment

### The project is containerized using Docker, with separate containers for the backend and frontend.

## Running the Project
1. Clone the repository.
2. Navigate to the project directory.
3. Run `docker-compose up` to start the containers.
The backend API will be available at http://localhost:5000, and the frontend will be available at http://localhost

