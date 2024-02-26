const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

// Route to handle account creation
// router.post('/create', accountController.createAccount);

// Route to handle deposit to an account
router.post('/deposit', accountController.deposit);

// Route to handle withdrawal from an account
router.post('/withdraw', accountController.withdraw);

// Route to handle transferring funds between accounts
router.post('/transfer', accountController.transfer);

// Route to get transaction history for an account
router.get('/:accountId/transactions', accountController.getTransactionHistory);

router.get('/accounts/:accountId/transactions', accountController.getTransactionHistory);

module.exports = router;
