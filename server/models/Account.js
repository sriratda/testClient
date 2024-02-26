const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    id: String,
    accountId: String,
    type: String,
    amount: Number,
    remain: Number,
    timestamp: { type: Date, default: Date.now }
});

const accountSchema = new Schema({
    username: { type: String, required: true }, // Add the username field
    id: String,
    balance: Number,
    transactions: [transactionSchema]
});

const AccountModel = mongoose.model('Account', accountSchema);

module.exports = AccountModel;
