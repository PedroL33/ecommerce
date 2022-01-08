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
  if(err.message == "new row for relation \"products\" violates check constraint \"stock_is_positive\"") {
    return res.status(500).json({
      status: 'error',
      msg: "Out of stock."
    })
  }
  return res.status(500).json({
    status: 'error',
    msg: err.message
  })
}

module.exports = handleErrors;