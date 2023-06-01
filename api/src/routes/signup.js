const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const User = require('../models/user')


router.post('/v2/signup', async (req, res) => {

    try {

        const { email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = new User({
            email,
            password: hashedPassword
        })
        await user.save()

        return res.status(201).send({ user: user })
        
    } catch (error) {
        res.status(500).send({ error: error })
    }
})
module.exports = router