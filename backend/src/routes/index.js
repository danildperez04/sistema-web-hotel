const router = require('express').Router();

const usersRouter = require('./users.js');
const clientsRouter = require('./clients.js');
const roomsRouter = require('./room.js');

router.post('/auth');
router.use('/users', usersRouter);
router.use('/clients', clientsRouter);
router.use('/rooms', roomsRouter);

module.exports = router; 