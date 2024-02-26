const Transaction = require('../models/Transaction');
const Account = require('../models/Account');
const mongoose = require('mongoose');

// MongoDB model for the transaction (replace with your actual model)
const TransactionModel = require('../models/Transaction');
const AccountModel = require('../models/Account');

exports.createTransaction = async (req, res) => {
    try {
        const { accountId, type, amount } = req.body;
        // Create a new transaction
        const transaction = new Transaction(mongoose.Types.ObjectId(), accountId, type, amount);
        // Save the transaction to MongoDB
        await TransactionModel.create(transaction.toJson());
        res.status(201).send({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getTransactionHistory = async (req, res) => {
    try {
        const { accountId } = req.params;
        // Fetch transactions from MongoDB
        const transactions = await TransactionModel.find({ accountId });
        res.status(200).send({ transactions });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

// Additional transaction-related methods can be added here...

