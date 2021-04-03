'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/v1', require('./routes/v1'));

/************************ TASK ENDPOINTS ************************/

// app.get('/task/moveTasks', (req, res) => {
  
// });

// app.put('/task/:taskID', (req, res) => {
  
// });

// app.delete('/task/:taskID', (req, res) => {

// });

// app.put('/task/complete/:taskID', (req, res) => {
  
// });

/********************** TASKLIST ENDPOINTS **********************/
// app.get('/taskList/:userID/today', (req, res) => {

// });

// app.get('/taskList/:userID/yesterday', (req, res) => {
  
// });

// app.delete('/taskList/:taskListID', (req, res) => {
  
// });

/************************ USER ENDPOINTS ************************/

// app.post('/user', (req, res) => {

// });

// app.post('/user', (req, res) => {
  
// });

// app.get('/user', (req, res) => {

// });

// app.get('/user', (req, res) => {

// });

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));