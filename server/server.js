
require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Controllers
app.use(require('./controllers/index'));

//Conexion BD
mongoose.connect(process.env.URLBASE, { useNewUrlParser: true });

app.listen(process.env.PORT);

