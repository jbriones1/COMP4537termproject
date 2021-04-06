const router = require('express').Router();

const authentication = require('../utilities/login');

router.post('/login', authentication.login);

router.get('/logout', (req, res) => {
  res.status(200).send('Logged out successfully');
});

module.exports = router;