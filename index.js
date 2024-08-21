const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const jwtSecret = 'Maverick';


const app = express();
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Prasad@123',
    database: 'crud_db'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        process.exit(1);
    }
    console.log('MySQL Connected...');
});

app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    connection.query(query, [name, email, hashedPassword], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('User registered successfully');
    });
});

app.get('/users', (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

app.get('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM users WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(result);
    });
});

app.post('/users', (req, res) => {
    const { name, email } = req.body;
    const query = `INSERT INTO users (name, email) VALUES (?, ?)`;
    connection.query(query, [name, email], (err, result) => {
        if (err) {
            console.error('Error creating user:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('User created successfully');
    });
});

app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const query = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
    connection.query(query, [name, email, id], (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('User updated successfully');
    });
});

app.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM users WHERE id = ?`;
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('User deleted successfully');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});