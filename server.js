'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/v1', require('./routes/v1'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));