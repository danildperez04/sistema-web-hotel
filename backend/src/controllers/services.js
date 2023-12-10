const Service = require('../services/services.service');
const servicesService = new Service();

const getAll = async (req, res) => {
  const services = await servicesService.getAll();

  res.send(services);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const service = await servicesService.getOne(id);
  res.send(service);
};

const create = async (req, res) => {
  const { name, price, details } = req.body;
  const service = await servicesService.create({
    name,
    price,
    details,
  });

  res.send(service);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, price, details } = req.body;
  const foundService = await servicesService.getOne(id);

  if (!foundService) {
    res.status(404).send({
      message: 'Service not found'
    });
  }

  const serviceToUpdate = {
    name,
    price,
    details,
  };

  const updateService = await servicesService.update(serviceToUpdate, id);

  res.send(updateService);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const foundService = await servicesService.getOne(id);

  if (!foundService) {
    res.status(404).send({
      message: 'Service not found'
    });
  }

  await servicesService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};