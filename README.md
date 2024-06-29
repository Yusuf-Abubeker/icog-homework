# Comment Management System

This project was developed as a part of an assignment for Docker training. The task was to build a frontend using HTML and a backend using Python, containerized using Docker.

## Project Structure

- `backend/`: Contains the Flask API implementation.
- `frontend/`: Contains the HTML, CSS, and JavaScript files for the frontend.

## Technologies Used

- Backend: Python with Flask
- Frontend: HTML, CSS, JavaScript
- Containerization: Docker

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

