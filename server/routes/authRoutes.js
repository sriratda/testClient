const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const Account = require('../models/Account'); // Import the Account model
const authController = require('../controllers/authController');
const accountController = require('../controllers/accountController'); // Import the accountController


// Define route for login page
// router.get('/login', (req, res) => {
//     res.send(`<html><body>${ReactDOMServer.renderToString(<Login />)}</body></html>`);
// });

// Define route for handling login form submission
router.post('/login', authController.postLogin);

// Define route for user profile page
router.get('/profile', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1]; // Expecting "Bearer [token]"

    try {
        // Verify the token
        jwt.verify(token, 'your_secret_key', async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Unauthorized' });
            } else {
                const user = await User.findById(decoded.userId);
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const account = await Account.findOne({ username: user.username });
                if (!account) {
                    return res.status(404).json({ message: 'Account not found' });
                }

                // Return user and account data in JSON format
                res.json({ user, account });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});



router.get('/deposit', accountController.getDeposit);
router.get('/withdraw', accountController.getWithdraw);
router.get('/transfer', accountController.getTransfer);
router.get('/accounts/:accountId/transactions', accountController.getTransactionHistory);

router.get('/login', (req, res) => {
    res.render('login', { message: '' }); // Pass an empty message initially
});

module.exports = router;


