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
 * Inserts a refresh token into the database.
 * 
 * @param {String} refreshToken 
 */
const insertToken = async (refreshToken) => {

  const query =
    `INSERT INTO token (token)
     VALUES (?)`;

  sql.db.query(query, [refreshToken])
    .then(result => {
      return refreshToken;
    })
    .catch(err => {
      console.log(err);
      return;
    })
}

/**
 * Refreshes an access token by using the refresh token.
 * 
 * Returns 200 with a new access token
 * Returns 500 on database error or jwt error
 * 
 * @param {Object} req request
 * @param {Object} res response 
 * @returns status code
 */
const refresh = (req, res) => {
  const refreshToken = req.body.token;

  if (refreshToken == null) return res.sendStatus(401);

  const query =
    `SELECT * 
      FROM Token
      WHERE token = ?`;

  sql.db.query(query, [refreshToken])
    .then(result => {
      // If no tokens are found
      if (result[0].length < 1) return res.sendStatus(403);

      token.verifyRefreshToken(refreshToken)
        .then(result => {

          if (!result) return res.sendStatus(500);

          return res.status(200).json({
            accessToken: result
          });
        })
        .catch(err => {
          return res.sendStatus(500);
        });
    });
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

  // Make sure username and password match
  getUserByCredentials(username, password)
    .then(result => {

      // There should only be one entry returned
      if (result.length !== 1) return res.sendStatus(400);

      // Remove the password from the payload and turn it into a plain JSON object
      const user = JSON.parse(JSON.stringify(result[0]));
      delete user.user_password;

      // Generate an access token (expires after 30 minutes) and a refresh token (expires on logout)
      const accessToken = token.generateAccessToken(user);
      const refreshToken = token.generateRefreshToken(user);

      // Insert the refresh token into the database
      insertToken(refreshToken)
        .then(result => {
          return res.status(200).json({
            user,
            accessToken,
            refreshToken
          });
        })
        .catch(err => {
          console.log(err);
          return res.sendStatus(500);
        });
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
}

/**
 * Logs the user out by deleting their refresh token.
 * 
 * 
 * @param {Object} req request
 * @param {Object} res response
 */
const logout = (req, res) => {
  const query =
    `DELETE FROM token
     WHERE token = ?`;

  sql.db.query(query, [req.body.token])
    .then(result => res.sendStatus(200))
    .catch(err => res.sendStatus(500));
}

module.exports = {
  login,
  logout,
  refresh
}