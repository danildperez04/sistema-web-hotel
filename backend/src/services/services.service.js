const { Service: serviceModel } = require('../models/services');

class Service {
  getAll() {
    return serviceModel.findAll();
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

module.export = Service;