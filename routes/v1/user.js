'use strict';

const express = require('express');
const queries = require('../../utilities/operations/op_user.js');
const router = express.Router({mergeParams: true});

router.post('/', queries.createUser);

router.get('/:userID', queries.getUserByID);

module.exports = router;