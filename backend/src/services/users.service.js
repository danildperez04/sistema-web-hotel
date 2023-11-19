const { User: userModel } = require('../models/user');

class User {
  async getAll() {
    return userModel.findAll();
  }

  async getOne(id) {
    return await userModel.findOne({ where: { id } });
  }

  async create(userData) {
    return await userModel.create(userData);
  }

  async update(userToUpdate, id) {
    return await userModel.update(userToUpdate, {
      where: { id }
    });
  }

  async remove(id) {
    return await userModel.destroy({
      where: { id }
    });
  }
}

module.exports = User;