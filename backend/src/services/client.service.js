const { Client: clientModel } = require('../models/client');

class Client {
  async getAll() {
    return await clientModel.findAll();
  }

  async getOne(id) {
    const client = await clientModel.findOne({where: {id}});
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
}

module.exports = Client;