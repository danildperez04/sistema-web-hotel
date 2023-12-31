const { Client: clientModel } = require('../models/client');
const { Department: departmentModel } = require('../models/department');
const { Municipality } = require('../models/municipality');
class Client {
  async getAll() {
    return await clientModel.findAll({ include: { all: true } });
  }

  async getOneBy(param) {
    return await clientModel.findOne({ where: param, include: { all: true } });
  }

  async getOne(id) {
    const client = await clientModel.findOne({ include: { all: true }, where: { id } });
    return client?.dataValues;
  }

  async create(clientData) {
    return await clientModel.create(clientData);
  }

  async update(clientToUpdate, id) {
    return await clientModel.update(clientToUpdate, {
      where: { id }
    });
  }

  async remove(id) {
    return await clientModel.destroy({
      where: { id }
    });
  }

  async getDepartments() {
    const departments = await departmentModel.findAll({
      include: { model: Municipality, as: 'municipalities' }
    });

    return departments;
  }
}

module.exports = Client;