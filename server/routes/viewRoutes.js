const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('login')
})


// Define the /deposit route
router.get('/deposit', (req, res) => {
    res.render('deposit');
});


module.exports = router;
