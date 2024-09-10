# Express.js CRUD Application with MySQL and JWT Authentication

This application is a simple CRUD (Create, Read, Update, Delete) project built with Express.js and MySQL, enhanced with JWT (JSON Web Token) authentication. It allows users to register, log in, and manage session tokens for secure access to user data.

## Prerequisites

Ensure you have the following installed on your local development environment:

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)

## Setup Instructions

Follow the steps below to set up and run the application:

### 1. Clone the Repository

```bash
git clone https://github.com/Prasadkadam03/Express_with_CRUD.git
cd express-mysql-crud
```

### 2. Install Dependencies

Run the following command to install the required Node.js packages:

```bash
npm install
```

### 3. Set Up the MySQL Database

1. **Start MySQL Server:** Make sure your MySQL server is running.

2. **Create the Database:**
   - Access your MySQL database through the terminal or a GUI client like MySQL Workbench.
   - Create a new database by running the following SQL command:

   ```sql
   CREATE DATABASE crud_db;
   ```

3. **Create the Users Table:**
   - Switch to the `crud_db` database and create a `users` table with an additional `password` and `session_token` column:

   ```sql
   USE crud_db;

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100) UNIQUE,
       password VARCHAR(255),
       session_token VARCHAR(255)
   );
   ```

### 4. Configure the MySQL Connection

Open the `index.js` file and update the MySQL connection details to match your local environment:

```javascript
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: 'Prasad@123', // Replace with your MySQL password
    database: 'crud_db' // Ensure this matches the database you created
});
```

### 5. Start the Server

Run the following command to start the Express.js server:

```bash
node index.js
```

You should see the following output in your terminal:

```bash
Server started on port 3000
MySQL Connected...
```

### 6. Use the API Endpoints

You can use the following API endpoints to interact with the application:

#### Authentication Routes

- **User Signup:**
  - **POST** `/signup`
  - Request body (JSON):
    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com",
        "password": "yourpassword"
    }
    ```

- **User Login:**
  - **POST** `/login`
  - Request body (JSON):
    ```json
    {
        "email": "johndoe@example.com",
        "password": "yourpassword"
    }
    ```
  - Returns a JWT token to be used in headers for authenticated requests.

- **User Logout:**
  - **POST** `/logout`
  - Requires authentication with the JWT token.
  
#### User Management Routes (Protected)

All user management routes require the `Authorization` header with the format:  
`Authorization: Bearer <token>`

- **Create a new user:**
  - **POST** `/users`
  - Request body (JSON):
    ```json
    {
        "name": "Jane Doe",
        "email": "janedoe@example.com"
    }
    ```
  
- **Read all users:**
  - **GET** `/users`

- **Read a single user by ID:**
  - **GET** `/users/:id`
  - Example: `/users/1`

- **Update a user by ID:**
  - **PUT** `/users/:id`
  - Request body (JSON):  
    ```json
    {
        "name": "John Doe Updated",
        "email": "johnupdated@example.com"
    }
    ```
  - Example: `/users/1`

- **Delete a user by ID:**
  - **DELETE** `/users/:id`
  - Example: `/users/1`

### 7. Testing the API with Postman

1. **Register a User:** Send a `POST` request to `/signup` with the user's details.
2. **Login:** Send a `POST` request to `/login` with the user's credentials to receive a JWT token.
3. **Access Protected Routes:** Use the token from the login response in the `Authorization` header as `Bearer <token>` to access routes like `/users`.
4. **Logout:** Send a `POST` request to `/logout` with the JWT token in the `Authorization` header.

### 8. Stop the Server

To stop the server, simply press `Ctrl + C` in the terminal where the server is running.

