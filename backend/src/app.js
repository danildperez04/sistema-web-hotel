const express = require('express');
const { notFound } = require('./middlewares/not-found');

const app = express();
const api = require('./routes/index');
const morgan = require('morgan');

app.use(express.static('../frontend/dist'));

app.use(express.json());
app.use(morgan('dev'));

app.use('/api', api);

app.use(notFound);

module.exports = app;