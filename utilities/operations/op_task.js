const sql = require('../db');

/**
 * Adds a task.
 * 
 * 200: success
 * 400: invalid body
 * 500: database error
 * 
 * @param {Object} req request
 * @param {Object} res result
 * @returns status code
 */
const addTask = (req, res) => {

  const {
    taskName,
    taskDescription,
    isComplete,
    taskListID
  } = req.body;

  if (!taskName || !taskDescription || isComplete == null || taskListID == null) {
    return res.sendStatus(400);
  }

  const query =
    `INSERT INTO task SET ?`;

  sql.db.query(query, [{
      taskName,
      taskDescription,
      isComplete,
      taskListID
    }])
    .then(result => res.sendStatus(200))
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

/**
 * Mark a task complete.
 * 
 * 200: success
 * 400: invalid taskID
 * 404: task not found
 * 500: database error
 * 
 * @param {Object} req request
 * @param {Object} res result
 * @returns status code
 */
const completeTask = (req, res) => {

  if (req.params.taskID == null) return res.sendStatus(400);

  const query =
    `UPDATE task
     SET isComplete=1
     WHERE taskID=?`;

  sql.db.query(query, [req.params.taskID])
    .then(([result, _]) => {

      if (result.affectedRows < 1) return res.sendStatus(404);

      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
}

/**
 * Delete a task.
 * 
 * 200: success
 * 400: invalid taskID
 * 404: task not found
 * 500: database error
 * 
 * @param {Object} req request
 * @param {Object} res result
 * @returns status code
 */
const deleteTask = (req, res) => {

  if (req.params.taskID == null) return res.sendStatus(400);

  const query =
    `DELETE FROM task
     WHERE taskID = ?`;

  sql.db.query(query, [req.params.taskID])
    .then(([result, _]) => {

      if (result.affectedRows < 1) return res.sendStatus(404);

      res.sendStatus(200);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });

}

const moveTasks = (req, res) => {

}

const updateTask = (req, res) => {

}

module.exports = {
  addTask,
  completeTask,
  deleteTask,
  moveTasks,
  updateTask
}