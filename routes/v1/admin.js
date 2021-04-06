'use strict';

const express = require('express');
const router = express.Router({mergeParams: true});
const queries = require('../../utilities/operations/op_admin');

router.get('/stats', queries.getAdminStats);

module.exports = router;