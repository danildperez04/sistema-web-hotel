const Service = require('../services/services.service');
const servicesService = new Service();

const getAll = async (req, res) => {
  const service = await servicesService.getAll();

  res.send(service);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  res.send(`Get Service {${id}} `);
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
      message: 'Servide not found'
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
      message: 'Servide not found'
    });
  }

  await servicesService.remove(id);

  res.sendStatus(204);
};

module.export = {
  getAll,
  getOne,
  create,
  update,
  remove,
};