const { Client : clientModel } = require('../models/client');

class Client{
  getAll(){
    return clientModel.findAll();
  }

  async create(clientData){
    return await clientModel.create(clientData);
  }
}

module.exports = Client;