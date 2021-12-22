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