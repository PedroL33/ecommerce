class GeneralError extends Error {
  constructor(msg) {
    super();
    this.msg = msg;
  }

  getCode() {
    if(this instanceof BadRequest) {
      return 400;
    }else if(this instanceof NotFound) {
      return 404;
    }else {
      return 500;
    }
  }
}

class ValidationError extends Error {
  constructor(errors) {
    super();
    this.errors = errors;
  }

  getCode() {
    return 400;
  }
}

class BadRequest extends GeneralError { };

class NotFound extends GeneralError { };

module.exports = {
  GeneralError,
  BadRequest,
  NotFound,
  ValidationError
}
