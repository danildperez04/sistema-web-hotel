const express = require('express');
const { notFound } = require('./middlewares/not-found');

const app = express();
const api = require('./routes/index');
const morgan = require('morgan');

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res)=>{
  res.json({message: 'Welcome to LOS POLLOS HERMANOS'});
});

app.use('/api', api);

app.use(notFound);

module.exports = app;