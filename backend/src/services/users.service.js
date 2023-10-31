const { User: userModel } = require('../models/user');

class User{
  getAll(){
    return userModel.findAll();
  }

  async create(userData){

    return await userModel.create(userData);
  }
}

module.exports = User;