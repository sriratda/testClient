const Account = require('../models/Account');
const mongoose = require('mongoose');

// MongoDB model for the account (replace with your actual model)
const AccountModel = require('../models/Account');

// exports.createAccount = async (req, res) => {
//   try {
//     const { id, balance } = req.body;
//     const newAccount = new Account(id, balance);
//     const accountModel = new AccountModel(newAccount);
//     await accountModel.save();
//     res.status(201).send({ message: 'Account created successfully', account: newAccount });
//   } catch (error) {
//     res.status(500).send({ message: error.message });
//   }
// };
exports.deposit = async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    console.log(accountId, amount);

    // Convert amount to a number
    const depositAmount = parseFloat(amount);

    // Find the account by its username
    const accountModel = await AccountModel.findOne({ username: accountId });

    // Check if the account exists
    if (!accountModel) {
      return res.status(404).send({ message: 'Account not found' });
    }

    // Perform the deposit operation on the account
    accountModel.balance += depositAmount;
    const transaction = {
      type: 'Deposit',
      amount: depositAmount,
      timestamp: new Date()
    };
    accountModel.transactions.push(transaction);

    // Save the updated account
    await accountModel.save();

    res.status(200).json({ message: 'Deposit successful', transaction });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};



exports.withdraw = async (req, res) => {
  try {
    const { accountId, amount } = req.body;
    console.log(accountId, amount);

    // Convert amount to a number
    const withdrawAmount = parseFloat(amount);

    // Find the account by its username
    const accountModel = await AccountModel.findOne({ username: accountId });

    // Check if the account exists
    if (!accountModel) {
      return res.status(404).send({ message: 'Account not found' });
    }

    // Check if the account has sufficient balance for withdrawal
    if (accountModel.balance < withdrawAmount) {
      return res.status(400).send({ message: 'Insufficient balance' });
    }

    // Perform the withdrawal operation on the account
    accountModel.balance -= withdrawAmount;
    const transaction = {
      type: 'Withdrawal',
      amount: withdrawAmount,
      timestamp: new Date()
    };
    accountModel.transactions.push(transaction);

    // Save the updated account
    await accountModel.save();

    res.status(200).json({ message: 'Withdrawal successful', transaction });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.transfer = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount } = req.body;

    // Convert amount to a float
    const transferAmount = parseFloat(amount);

    // Find the accounts by their ids
    const fromAccountModel = await AccountModel.findOne({ username: fromAccountId });
    const toAccountModel = await AccountModel.findOne({ id: toAccountId });

    if (!fromAccountModel || !toAccountModel) {
      return res.status(404).send({ message: 'Account not found' });
    }

    // Check for sufficient balance
    if (fromAccountModel.balance < transferAmount) {
      return res.status(400).send({ message: 'Insufficient balance for transfer' });
    }
    
    // Perform the transfer
    fromAccountModel.balance -= transferAmount;
    toAccountModel.balance += transferAmount;

    // Calculate remaining balances
    const fromRemainingBalance = fromAccountModel.balance;
    const toRemainingBalance = toAccountModel.balance;

    // Create transaction objects with accountId, a generated id, and remaining balance
    const fromTransaction = {
      id: new mongoose.Types.ObjectId(), // Generate unique id
      accountId: toAccountId,
      type: 'Transfer',
      amount: -transferAmount,
      remain: fromRemainingBalance,
      timestamp: new Date()
    };
    const toTransaction = {
      id: new mongoose.Types.ObjectId(), // Generate unique id
      accountId: fromAccountId,
      type: 'Receive',
      amount: transferAmount,
      remain: toRemainingBalance,
      timestamp: new Date()
    };

    // Add transactions to respective accounts
    fromAccountModel.transactions.push(fromTransaction);
    toAccountModel.transactions.push(toTransaction);

    // Save the updated accounts
    await fromAccountModel.save();
    await toAccountModel.save();

    res.status(200).send({ message: 'Transfer successful', transactions: [fromTransaction, toTransaction] });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}


exports.getDeposit = async (req, res) => {
  try {
      const userId = req.query.userId;
      const token = req.query.token; // Extract the token from the query parameters
      const account = await Account.findOne({ username: userId });
   
      if (!account) {
          return res.status(404).json({ message: 'Account not found' });
      }
      // Render deposit page with account information and token
      res.render('deposit', { account, token }); // Pass the token to the template
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getWithdraw = async (req, res) => {
  try {
     const userId = req.query.userId;
     const token = req.query.token; // Extract the token from the query parameters
 
         // Retrieve user's account information based on user ID
         const account = await Account.findOne({ username: userId });
         if (!account) {
             return res.status(404).json({ message: 'Account not found' });
         }
         // Render deposit page with account information
         res.render('withdraw', { account, token });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
};

exports.getTransfer = async (req, res) => {
  try {
      const userId = req.query.userId;
      const token = req.query.token; // Extract the token from the query parameters

      // Retrieve user's account information based on user ID
      const account = await Account.findOne({ username: userId });
      if (!account) {
          return res.status(404).json({ message: 'Account not found' });
      }
      // Render deposit page with account information
      res.render('transfer', { account, token });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

exports.getTransactionHistory = async (req, res) => {
  try {
    const { accountId } = req.params;
    const accountModel = await AccountModel.findOne({ username: accountId });
    const token = req.query.token; // Extract the token from the query parameters

    if (!accountModel) {
      return res.status(404).send({ message: 'Account not found' });
    }

    let transactions = accountModel.transactions;
    console.log
    // Sort transactions by date and time in descending order
    transactions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.status(200).render('transactionHistory', { accountId, transactions, token });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};





