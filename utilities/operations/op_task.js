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

/**
 * Moves all the incomplete tasks of the current day to the next day.
 * Makes a new task list and removes incomplete tasks from the date supplied.
 * 
 * 200: success
 * 400: invalid body
 * 404: no current task list found
 * 500: database error
 * 
 * @param {Object} req request
 * @param {Object} res result
 * @returns status code
 */
const moveTasks = async (req, res) => {

  const { userID, date } = req.body;

  if (userID == null || !date) return res.sendStatus(400);
  
  try {

    // Find the task list for the current day
    const q1 = 
      `SELECT taskListID
       FROM taskList
       WHERE userID = ?
             AND date = ?`;

    const [result1, ] = await sql.db.query(q1, [userID, date]);

    if (result1.length < 1) return res.sendStatus(404);

    const currTaskListID = result1[0].taskListID;
    
    // Create a taskList for the next day
    const nextDate = addDay(date);

    const q2 =
      `INSERT INTO taskList
        SET ?`;
    
    const [result2, ] = await sql.db.query(q2, [{ userID, date: nextDate }]);
    const newTaskListID = result2.insertId;
    console.log(newTaskListID);

    
    // Set all incomplete tasks for today to tomorrow
    const q3 = 
      `UPDATE task
       SET taskListID = ?
       WHERE taskListID = ? 
             AND isComplete = 0`;

    await sql.db.query(q3, [newTaskListID, currTaskListID]);

    res.sendStatus(200);
    
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

}

/**
 * Adds a day to the date passed in.
 * 
 * @param {String} date format YYYY-MM-DD
 * @returns string of next date in format YYYY-MM-DD
 */
const addDay = (date) => {
  
  // Creates a date from the string
  const currDate = new Date(date);

  // Adds a day 
  const nextDate = new Date(currDate.setDate(currDate.getDate() + 1));

  // Returns the ISO date without the time
  return nextDate.toISOString().split('T')[0];
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