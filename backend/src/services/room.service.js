const { Room: roomModel } = require('../models/rooms');

class Room {
  async getAll() {
    return await roomModel.findAll({});
  }

  async getOne(id) {
    const room = await roomModel.findOne({ where: { id } });
    return room?.dataValues;
  }

  async create(roomData) {
    return await roomModel.create(roomData);
  }

  async update(roomToUpdate, id) {
    return await roomModel.update(roomToUpdate, {
      where: { id }
    });
  }

  async remove(id) {
    return await roomModel.destroy({
      where: { id }
    });
  }
}

module.exports = Room;