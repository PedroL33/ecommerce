const jwt = require('jsonwebtoken');
const { BadRequest, NotFound } = require('../utils/errors');

exports.memberAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.jwtSecretKey);
    if(decoded.iat < (Date.now()/1000)-3600) {
      throw new BadRequest("Session expired")
    }else {
      return next();
    }
  }catch(err) {
    next(err)
  }
}     

exports.adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(decoded.exp < (Date.now()/1000)) {
      throw new BadRequest("Session expired.")
    }else if(decoded.permissions!=="admin"){
       throw new BadRequest("Admin privilages required.");
    }else {
      return next();
    }
  } catch(err) {
    next(err);
  }
}