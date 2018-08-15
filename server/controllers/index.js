const express = require('express');

const app = express();

//Controllers
app.use(require('./clienteController'));

module.exports = app;