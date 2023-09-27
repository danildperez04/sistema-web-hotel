const router = require('express').Router();

const usersRouter = require('../routes/users');

router.use('/users', usersRouter);

module.exports = router;