'use strict';

const express = require('express');
const router = express.Router();


router.use('/task', require('./v1/task'));
router.use('/taskList', require('./v1/taskList'));
router.use('/admin', require('./v1/admin'));
router.use('/user', require('./v1/user'));

module.exports = router;