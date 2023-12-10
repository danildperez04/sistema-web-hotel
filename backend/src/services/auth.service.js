const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequestException } = require('../utils/customErrors');
const userService = new (require('./users.service'))();

class Auth {
  async login({ username, password }) {
    const user = await userService.getOneBy({ username });

    const isPasswordCorrect = user === null ? false : await bcrypt.compare(password, user.password);

    if (!(user && isPasswordCorrect)) {
      throw new BadRequestException('Wrong Credentials');
    }

    const userForToken = {
      id: user?.id,
      username: user?.username
    };

    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: '20d',

    });

    return token;
  }
}

module.exports = Auth;