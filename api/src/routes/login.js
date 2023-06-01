const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const User = require('../models/user')


router.post('/v2/login', async (req, res) => {

    try {

        const { email, password } = req.body

        const user = await User.findOne({ email: email })

        const KEY = 'key';
        const EXPIRE = '24h'

        if(!user) return res.send('User not found.')

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).send('Wrong password or email.')
        }
        const token = jwt.sign({ email }, KEY, { expiresIn: EXPIRE })
        res.cookie(user.email, { httpOnly: true, secure: true })

        return res.status(200).send({token})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: error })
    }
})
module.exports = router