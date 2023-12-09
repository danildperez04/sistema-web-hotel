const router = require('express').Router();

const usersRouter = require('./users.js');
const clientsRouter = require('./clients.js');
const servicesRouter = require('./services.js');
const roomsRouter = require('./room.js');
const reservationsRouter = require('./reservation.js');

const Client = require('../services/client.service.js');
const { login } = require('../controllers/auth.js');
const { getReport } = require('../controllers/report.js');

router.post('/auth', login);

router.use('/users', usersRouter);
router.use('/clients', clientsRouter);
router.use('/services', servicesRouter);
router.use('/rooms', roomsRouter);
router.use('/reservations', reservationsRouter);

router.get('/reports', getReport);

router.get('/departments', async (req, res) => {
  const clientService = new Client();

  res.send(await clientService.getDepartments());
});

module.exports = router; 