const { Service : serviceModel } = require('../models/services');

class Service{
  getAll(){
    return serviceModel.findAll();
  }

  async create(serviceData){
    return await serviceModel.create(serviceData);
  }
}

module.export = Service;