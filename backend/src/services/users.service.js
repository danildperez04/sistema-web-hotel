const { User: userModel } = require('../models/user');

class User{
  getAll(){
    return userModel.findAll();
  }
}

module.exports = User;