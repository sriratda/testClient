const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Route to handle the creation of a new transaction
router.post('/create', transactionController.createTransaction);

// Route to get the transaction history for a specific account
router.get('/:accountId/history', transactionController.getTransactionHistory);

module.exports = router;
