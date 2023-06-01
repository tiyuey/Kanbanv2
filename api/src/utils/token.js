const jwt = require('jsonwebtoken');

const KEY = 'key';
const EXPIRE = '24h'

const JWT = (req, res, next) => {
    try {
        const { email } = req.body
        const token = jwt.sign({ email }, KEY, { expiresIn: EXPIRE })
        req.token = token
        next()
        
    } catch (error) {
        res.status(500).json({ error: error })
    }
}

module.exports = JWT