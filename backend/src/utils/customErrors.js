const { HTTP_STATUS } = require('./http');

class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name;
    this.status;
    this.message = message;
  }
}

class AuthorizationException extends CustomError {
  constructor(message = 'Unauthorized') {
    super(message);
    this.name = 'AuthorizationException';
    this.status = HTTP_STATUS.UNAUTHORIZED;
  }
}

class NotFoundException extends CustomError {
  constructor(message = 'Not Found') {
    super(message);
    this.name = 'NotFoundException';
    this.status = HTTP_STATUS.NOT_FOUND;
  }
}

class BadRequestException extends CustomError {
  constructor(message = 'Bad Request') {
    super(message);
    this.name = 'BadRequestException';
    this.status = HTTP_STATUS.BAD_REQUEST;
  }
}



module.exports = { CustomError, AuthorizationException, NotFoundException, BadRequestException };