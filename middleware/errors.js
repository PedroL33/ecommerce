const { GeneralError, ValidationError } = require('../utils/errors');

const handleErrors = (err, req, res, next ) => {
  if(err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: 'error',
      msg: err.msg
    })
  }
  if(err instanceof ValidationError) {
    return res.status(err.getCode()).json({
      status: 'error',
      errors: err.errors
    })
  }
  return res.status(500).json({
    status: 'error',
    msg: err.message
  })
}

module.exports = handleErrors;