# Michael Vallido - IS24 Full-Stack Competition - req97073

This web application is designed to help the Province of BC track and manage their web applications. It allows users to create, view, update, and delete information about each web application. The application also offers search functionality, allowing users to search for products by specific Scrum Master or Developer.

## Prerequisites
Before you can build and run this application, you need to have the following software installed on your machine:

- Docker
- Docker Compose

## Building and Running the App
Follow these steps to build and run the app using Docker:

1. Clone the repository:

```
git clone https://github.com/mvallido/Michael-Vallido-IS24-full-stack-competition-req97073
cd Michael-Vallido-IS24-full-stack-competition-req97073
```

2. Build the Docker images and start the app:

```
docker-compose up --build
```

3. Open a web browser and go to http://localhost:8080 to access the app

## Technologies Used
- Node.js
- Express
- React
- Tailwind CSS
- Docker
- Swagger

Note that although PostgreSQL and Sequelize have been set up, the current implementation uses an in-memory solution for data storage. This means that the data is not persisted between server restarts, and any changes made to the data during runtime will be lost when the server is shut down.

To access the API documentation, navigate to http://localhost:3000/api/api-docs. Additionally, a health check endpoint is available at http://localhost:3000/health to verify that the server is up and running.
