const Client = require('../services/client.service');
const { NotFoundException, BadRequestException } = require('../utils/customErrors');
const { HTTP_STATUS } = require('../utils/http');
const clientService = new Client();

const getAll = async (req, res) => {
  const { dni } = req.query;

  let clients;

  if (dni) {
    clients = await clientService.getOneBy({ dni });
  }
  else {
    clients = await clientService.getAll();
  }

  if (!clients) {
    throw new NotFoundException('client not found');
  }

  res.send(clients);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const foundClient = await clientService.getOne(id);

  if (!foundClient) {
    throw new NotFoundException('client not found');
  }

  res.send(foundClient);
};

const create = async (req, res) => {
  const { dni, fullName, email, phoneNumber, address, birthDate, municipalityId } = req.body;

  const foundClient = await clientService.getOneBy({ dni });

  if (foundClient) {
    throw new BadRequestException('dni must be unique');
  }

  const client = await clientService.create({
    dni,
    fullName,
    email,
    phoneNumber,
    address,
    birthDate,
    municipalityId
  });

  res.status(HTTP_STATUS.CREATED).send(client);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { dni, fullName, email, phoneNumber, address, birthDate, municipalityId } = req.body;
  const foundClient = await clientService.getOne(id);

  if (!foundClient) {
    throw new NotFoundException('client not found');
  }

  const clientToUpdate = {
    dni,
    fullName,
    email,
    phoneNumber,
    address,
    birthDate,
    municipalityId
  };

  const updatedClient = await clientService.update(clientToUpdate, id);

  res.send(updatedClient);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const foundClient = await clientService.getOne(id);

  if (!foundClient) {
    throw new NotFoundException('client not found');
  }

  await clientService.remove(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
