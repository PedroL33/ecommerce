const jwt = require('jsonwebtoken');

module.exports.createToken = () => {
  return jwt.sign(
    {
      username: "User",
      permissions: "admin"
    }, 
    process.env.JWT_SECRET_KEY, 
    {
      expiresIn: 3600
    }
  )
}

module.exports.createCartToken = () => {
  return jwt.sign(
    {
      id: 1
    }, 
    process.env.JWT_SECRET_KEY, 
    {
      expiresIn: 3600
    }
  )
}