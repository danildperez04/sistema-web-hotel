const router = require('express').Router();

const usersRouter = require('./users.js');
const clientsRouter = require('./clients.js');

router.post('/auth');
router.use('/users', usersRouter);
router.use('/clients', clientsRouter);

module.exports = router; 