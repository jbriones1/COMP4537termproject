const jwt = require('jsonwebtoken');

const generateSessionToken = (username) => {
  return jwt.sign(username, process.env.TOKEN_SECRET);
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    
    // Token is no longer valid
    if (err) return res.sendStatus(403)

    req.token = token

    next()
  })
}

module.exports = {
  generateSessionToken,
  authenticateToken
}