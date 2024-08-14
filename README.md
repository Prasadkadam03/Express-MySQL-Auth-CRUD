# Express.js CRUD Application with MySQL

This is a simple CRUD (Create, Read, Update, Delete) application built using Express.js and MySQL. The application allows you to perform basic operations on a `users` table in a MySQL database.

## Prerequisites

Before you begin, ensure you have the following installed on your local development environment:

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
   - Switch to the `crud_db` database and create a `users` table:

   ```sql
   USE crud_db;

   CREATE TABLE users (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100),
       email VARCHAR(100)
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

You can now use the following API endpoints to interact with the `users` table:

- **Create a new user:**
  - **POST** `/users`
  - Request body (JSON):
    ```json
    {
        "name": "John Doe",
        "email": "johndoe@example.com"
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

### 7. Stop the Server

To stop the server, simply press `Ctrl + C` in the terminal where the server is running.
