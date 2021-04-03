'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

app.all('*', (req, res, next) => {

	res.set('Access-Control-Allow-Origin', '*');
	res.set('Access-Control-Allow-Methods', 'GET,POST,PUT');
	res.set('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.use(bodyParser.json());
app.use('/v1', require('./routes/v1'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));