const jwt = require('jsonwebtoken');

const isAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied.' });
  }

  try {
    const decodedToken = jwt.verify(token.split(' ')[1], 'somesupersecretsecret');
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token, authorization denied.' });
  }
};

module.exports = isAuth;
