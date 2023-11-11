const { Service : ServiceModel } = require('../models/services');

class Service{
  getAll(){
    return ServiceModel.findAll();
  }

  async create(serviceData){
    return await ServiceModel.create(serviceData);
  }
}

module.export = Service;