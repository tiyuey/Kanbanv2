const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.post('/v2/login', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            }, process.env.JWT_REFRESH,
            { expiresIn: '7d' }
        );

        return res.status(200).json({
            statusCode: 200,
            msg: "Login successful",
            token, refreshToken
        });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
        return err;
    }
})

module.exports = router;
