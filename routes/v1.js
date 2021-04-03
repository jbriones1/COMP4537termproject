'use strict';

const express = require('express');
const router = express.Router();


router.use('/task', require('./v1/task'));

module.exports = router;