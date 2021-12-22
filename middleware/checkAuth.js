const jwt = require('jsonwebtoken');

exports.memberAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.jwtSecretKey);
    if(decoded.iat < (Date.now()/1000)-3600) {
      return res.status(401).json({
        error: "Session expired"
      })
    }else {
      return next();
    }
  } catch {
    res.status(401).json({
      error: "Auth failed."
    })
  }
}     

exports.adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if(decoded.exp < (Date.now()/1000)) {
      throw {
        msg: "Session expired"
      }
    }else if(decoded.permissions!=="admin"){
      throw {
        msg: "Admin privilages required."
      }
    }else {
      return next();
    }
  } catch(err) {
    res.status(401).json({
      errors: [
        err
      ]
    })
  }
}