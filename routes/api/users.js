const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route   POST api/users
// @desc    Register User
// @acess   Public
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({min: 8}),
    check('email', 'Please provide a valid email').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User Route');
});

module.exports = router;