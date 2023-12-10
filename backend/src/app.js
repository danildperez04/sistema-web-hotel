const express = require('express');
const { notFound } = require('./middlewares/not-found');

const app = express();
const cors = require('cors');
const api = require('./routes/index');
const morgan = require('morgan');
const { errorHandler } = require('./middlewares/error-handler');
const { userExtractor } = require('./middlewares/userExtractor');
const { login, signup } = require('./controllers/auth');

app.use(cors());

app.use(express.static('../frontend/dist'));

app.use(express.json());
app.use(morgan('dev'));

app.post('/auth', login);
app.post('/auth/signup', signup);
app.use('/api', userExtractor, api);

app.use(notFound);

app.use(errorHandler);

module.exports = app;