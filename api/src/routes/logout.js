const express = require('express')
const router = express.Router()

router.delete('/v2/logout', async (req, res) => {

    try {
        req.session.destroy()
        res.clearCookie('token')
    
        return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).send({ error: error });
    }
})
module.exports = router