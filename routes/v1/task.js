'use strict';

const router = require('express').Router({mergeParams: true});
const operations = require('../../utilities/operations/op_task');

router.post('/', operations.addTask);

router.route('/:taskID')
  .put((req, res) => { res.send('PUT task ' + req.params.taskID); })
  .delete((req, res) => { res.send('DELETE task ' + req.params.taskID); });

router.put('/complete/:taskID', (req, res) => {
  res.send('COMPLETE task ' + req.params.taskID);
});


module.exports = router;