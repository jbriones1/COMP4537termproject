const jwt = require('jsonwebtoken');

const TWO_HOURS = 1000 * 60 * 60 * 2; // Two hours in milliseconds

exports.generateSessionToken(userID) {
  return jwt.sign(userID, process.env.SECRET, { expiresIn: TWO_HOURS.toString()});
}