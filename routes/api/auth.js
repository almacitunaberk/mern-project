const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator/check');
const config = require('config');
const User = require('../../models/User');
const jwt = require('jsonwebtoken');

// @route   GET api/auth
// @desc    Test route
// @acess   Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// @route   POST api/auth
// @desc    Authenticate User and Get Token
// @acess   Public
router.post('/', [
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Password is required').exists()    
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {

        // LOGIN WORKFLOW

        // See if user exists -> Send back an error
        let user = await User.findOne({email: email});

        if (!user) {
            return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
        }

        // Checking if the password matches with the one in the database
        //      To do so, we compare the password given in the request body with the encrypted password in the database
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({errors: [{msg: "Invalid Credentials"}]});
        }

        // Return jsonwebtoken -> Because we want the user to get logged in right after she registers
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 36000},
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;