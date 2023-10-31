const router = require('express').Router();

const usersRouter = require('./users.js');

router.use('/users', usersRouter);

module.exports = router;