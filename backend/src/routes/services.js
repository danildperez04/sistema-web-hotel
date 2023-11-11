const { getAll, create, getOne, update , remove } = require('../controllers/services');

const router = require('express').Router();

router.route('/').get(getAll).post(create);

router.route('/:id').get(getOne).put(update).delete(remove);

module.exports = router;