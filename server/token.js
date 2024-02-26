try {
   
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

            res.render('profile', { account, balance: account.balance, token }); // Pass the token to the template
        }
    });
} catch (error) {
    res.status(500).json({ message: error.message });
}