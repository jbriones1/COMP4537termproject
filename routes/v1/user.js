'use strict';

const express = require('express');
const operation = require('../../utilities/operations/op_user.js');
const router = express.Router({mergeParams: true});

router.get('/:userID', operation.getUserByID);

module.exports = router;