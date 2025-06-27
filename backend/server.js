const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');

// Middleware to parse JSON and URL-encoded data (from forms)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// In-memory store for users (for testing purposes)
const users = {};

app.use(express.static(path.join(__dirname, '..')));

// Route for root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'..', 'nutriguide.html'));
});

// Route for login page
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'drishti.html'));
});

// Route for signup page
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname,'..',  'grace.html'));
});

// Handle signup POST request
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    // Store the user credentials in the 'users' object
    users[email] = { name, password };
    console.log(`Signup Details: Name - ${name}, Email - ${email}`);
    res.send('Signup successful!');
});

// Handle login POST request
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists in the 'users' object
    if (users[email] && users[email].password === password) {
        console.log(`Login successful: ${email}`);
        res.send('Login successful!');
    } else {
        console.log('Login failed');
        res.send('Invalid email or password!');
    }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
