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

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (results.length === 0) {
            return res.status(400).send('Invalid email or password');
        }

        const user = results[0];
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid email or password');
        }

        const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });

        const updateQuery = 'UPDATE users SET session_token = ? WHERE id = ?';
        connection.query(updateQuery, [token, user.id], (err) => {
            if (err) {
                console.error('Error updating session token:', err);
                return res.status(500).send('Internal Server Error');
            }
            res.json({ message: 'Login successful', token });
        });
    });
});

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied');
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(403).send('Invalid token');
        }

        const query = 'SELECT * FROM users WHERE id = ? AND session_token = ?';
        connection.query(query, [decoded.id, token], (err, results) => {
            if (err || results.length === 0) {
                return res.status(403).send('Session invalid or logged out from another device');
            }
            req.user = decoded;
            next();
        });
    });
};

app.get('/users', authenticateJWT, (req, res) => {
    const query = 'SELECT * FROM users';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error retrieving users:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.json(results);
    });
});

app.post('/logout', authenticateJWT, (req, res) => {
    const updateQuery = 'UPDATE users SET session_token = NULL WHERE id = ?';
    connection.query(updateQuery, [req.user.id], (err) => {
        if (err) {
            console.error('Error logging out:', err);
            return res.status(500).send('Internal Server Error');
        }
        res.send('Logged out successfully');
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
