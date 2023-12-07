const router = require('express').Router();

const usersRouter = require('./users.js');
const clientsRouter = require('./clients.js');
const servicesRouter = require('./services.js');
const roomsRouter = require('./room.js');
const reservationsRouter = require('./reservation.js');

//TODO: Auth route
router.post('/auth');
router.use('/users', usersRouter);
router.use('/clients', clientsRouter);
router.use('/services', servicesRouter);
router.use('/rooms', roomsRouter);
router.use('/reservations', reservationsRouter);

module.exports = router; 