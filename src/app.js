const express = require('express');
const index = require('./routes/index.controller');
const exceptionHandler = require('./exception-handler');
const calc = require('./routes/calc.controller');

const app = express();

app.use('/', index);
app.use('/*.wsdl',calc.router);

app.use(express.static('public'));
app.use('/*', exceptionHandler);

module.exports = app;
