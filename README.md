# RESTful API

This project is a simple RESTful API built using Node.js, Express.js, and MongoDB. It allows users to perform CRUD (Create, Read, Update, Delete) operations on articles stored in a MongoDB database. The API provides routes to target all articles or specific articles by title.

## Technologies Used

- Node.js
- Express.js
- MongoDB

## Features

- **GET**: Fetch all articles or a specific article by title.
- **POST**: Create a new article.
- **PUT**: Update an entire article.
- **PATCH**: Update specific fields of an article.
- **DELETE**: Delete all articles or a specific article.

## How to Run

1. Clone the repository.
2. Install the necessary dependencies:
   ```bash
   npm install
3. Start your MongoDB server:
    ```bash
    mongod
4. Start the application:
    ```bash
    node app.js
5. The API will be running at:
    ```bash
    http://localhost:3000