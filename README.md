# Issues Tracker API

## Description
This project is a RESTful API built with Node.js, Express, and MongoDB. It serves as an issue tracker where users can create, read, update, and delete issues.

## Features
- **Create Issue:** Allows users to create a new issue.
- **Read Issue:** Allows users to retrieve the list of issues or a specific issue by ID.
- **Update Issue:** Allows users to update the details of an existing issue by ID.
- **Delete Issue:** Allows users to delete an issue by ID.

## Prerequisites
Before you begin, ensure you have met the following requirements:
- You have installed Node.js.
- You have installed vercel locally.
- You have a MongoDB Atlas account and cluster.

## Installation and Setup
1. **Clone the repository**
   ```sh
   git clone -b Issue-manager-api https://github.com/acdeiiknprv/Issues-Tracker-API.git
   ```
2. **Navigate to the project directory**
   ```sh
   cd ./Issues-Tracker-API/
   ```
3. **Install dependencies**
    ```sh
    npm install
    ```
4. **Setup you environment variables**

### You have the choice between:
5. **Start the server locally with Vercel**
    ```sh
    vercel dev
    ```
5. **Start the backup server**
    ```sh
    node ./server.js
    ```

## API Endpoints

### 1. `GET /issues`
   - **Description:** Fetch all issues.
   - **Responses:**
     - `200 OK` on success, returns an array of issues.
     - `500 Internal Server Error` if there is a server error.

### 2. `GET /issues/:id`
   - **Description:** Fetch issues by id.
   - **Parameters:** 
     - `id` (path) – The issue id to retrieve.
   - **Responses:**
     - `200 OK` on success, returns the issue object.
     - `404 Not Found` if the id doesnt exist in the database.
     - `500 Internal Server Error` if there is a server error.

### 3. `POST /issues`
   - **Description:** Create a new issue.
   - **Body:**
     ```json
     {
       "name": "string",
       "description": "string",
       "dueDate": "Date"
     }
     ```
   - **Responses:**
     - `201 Created` on success, returns the created issue object.
     - `400 Bad Request` if the issue doesn't have the correct format.
     - `500 Internal Server Error` if there is a server error.

### 4. `PUT /issues/:id`
   - **Description:** Update an existing issue by ID.
   - **Parameters:**
     - `id` (path) – The ID of the issue to update.
   - **Body:**
     ```json
     {
       "name": "string",
       "description": "string",
       "dueDate": "string"
     }
     ```
   - **Responses:**
     - `200 OK` on success, returns the updated issue object.
     - `404 Not Found` if an issue with the specified ID does not exist.
     - `400 Bad Request` if the issue doesn't have the correct format.
     - `500 Internal Server Error` if there is a server error.

### 5. `DELETE /issues/:id`
   - **Description:** Delete an issue by ID.
   - **Parameters:**
     - `id` (path) – The ID of the issue to delete.
   - **Responses:**
     - `204 No Content` on success.
     - `404 Not Found` if an issue with the specified ID does not exist.
     - `400 Bad Request` if the ID is not a valid MongoDB ObjectId.
     - `500 Internal Server Error` if there is a server error.

## Technologies Used

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)

## Hosting

This project has been hosted on Vercel.

### Access the API
To access the API from Vercel, follow this [link](https://issue-manager-api.vercel.app/).

## Contact

**Project Maintainer:** Kevin Picard - [kevin.picard.au@gmail.com](mailto:kevin.picard.au@gmail.com) - [<a href="tel:0475564651">0475 564 651</a>]
