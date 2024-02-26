const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import the jsonwebtoken module
const User = require('../models/User');

// Function to render the login page
exports.getLogin = (req, res) => {
    res.render('login', { message: ' ' }); // Pass an empty message initially
};

exports.postLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password is correct
        const isPasswordValid = await password == user.password;
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user._id }, 'your_secret_key');

        
        // Redirect user to profile page with token in query parameter
        // res.redirect(`/profile?token=${token}&userId=${username}`);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

