const sql = require('./db');
const token = require('./token');
const bcrypt = require('bcrypt');

/**
 * Finds the user using the username and password and returns the result.
 * 
 * @param {String} username 
 * @param {String} password unhashed password
 * @returns query result
 */
const getUserByCredentials = async (username, password) => {

  const query =
    `SELECT * 
     FROM User
     WHERE username = ? AND
           user_password = ?`;

  const result = await sql.db.query(query, [username, password]);

  return result[0];
}

/**
 * Logs the user into the application
 * 
 * Returns 200 with the JSON WebToken if the user is authenticated
 * Returns 400 on incorrect credentials
 * 
 * @param {Object} req request object
 * @param {Object} res response object
 * @returns status code
 */
const login = (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) return res.sendStatus(400);

  getUserByCredentials(username, password)
    .then(result => {

      // There should only be one entry returned
      if (result.length !== 1) return res.sendStatus(400);

      const user = result[0];

      // If they match, create a token and send it back in the response
      const sessionToken = token.generateSessionToken({
        username: user.username,
        name: user.name,
        id: user.userID
      });

      // If they don't match, send back 400
      return res.status(200).json({
        sessionToken
      });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

module.exports = {
  login
}