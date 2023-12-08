const { Service: serviceModel } = require('../models/services');

class Service {
  async getAll() {
    return serviceModel.findAll();
  }

  async getOne(id) {
    return serviceModel.findOne({ where: { id } });
  }

  async create(serviceData) {
    return await serviceModel.create(serviceData);
  }

  async update(serviceToUpdate, id) {
    return await serviceModel.update(serviceToUpdate, {
      where: { id }
    });
  }

  async remove(id) {
    return await serviceModel.destroy({
      where: { id }
    });
  }
}

module.exports = Service;