const express = require('express');
const { notFound } = require('./middlewares/not-found');

const app = express();
const api = require('./routes/index');

app.use(express.json());

app.get('/', (req, res)=>{
  res.json({message: 'Welcome to LOS POLLOS HERMANOS'});
});

app.use(api);

app.use(notFound);

module.exports = app;