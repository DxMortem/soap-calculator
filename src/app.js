const express = require('express');
const index = require('./routes/index.controller');
const app = express();

app.use('/', index);
app.use(express.static('public'));

module.exports = app;
