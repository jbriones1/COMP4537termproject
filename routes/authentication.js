const router = require('express').Router();

const authentication = require('../utilities/login');

router.post('/login', authentication.login);

router.post('/token', authentication.refresh);

router.delete('/logout', authentication.logout);

module.exports = router;