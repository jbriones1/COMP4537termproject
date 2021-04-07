const jwt = require('jsonwebtoken');

const generateSessionToken = (username) => {
  return jwt.sign(username, process.env.SECRET);
}

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    
    if (err) return res.sendStatus(403)

    req.token = token

    next()
  })
}

module.exports = {
  generateSessionToken,
  authenticateToken
}