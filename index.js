const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

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

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});