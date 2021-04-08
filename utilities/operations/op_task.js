const sql = require('../db');

const addTask = (req, res) => {
  const taskName = req.body.taskName;
  const taskDescription = req.body.taskDescription;
  const isComplete = req.body.isComplete;
  const taskListID = req.body.taskListID;

  if (!taskName || !taskDescription || isComplete == null) {
    return res.sendStatus(400);
  }

  const values = {
    taskListID,
    taskName,
    taskDescription,
    isComplete
  }

  const query =
    `INSERT INTO task SET ?`;
  
  sql.db.query(query, [values])
  .then(result => res.sendStatus(200))
  .catch(err => res.sendStatus(500));
}

module.exports = {
  addTask
}