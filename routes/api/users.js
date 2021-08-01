const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register User
// @acess   Public
router.post('/', [
    check('name', 'Name is required').notEmpty(),
    check('password', 'Password must be at least 8 characters').isLength({min: 8}),
    check('email', 'Please provide a valid email').isEmail()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {

        // REGISTRATION WORKFLOW

        // See if user exists -> Send back an error

        let user = await User.findOne({email: email});

        if (user) {
            return res.status(400).json({errors: [{msg: "User already exists"}]});
        }

        // Get user's gravatar

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            password,
            avatar            
        });
        
        // Encrypt the password

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        // Save the user to the database

        await user.save();

        // Return jsonwebtoken -> Because we want the user to get logged in right after he/she registers

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            { expiresIn: 36000 },
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