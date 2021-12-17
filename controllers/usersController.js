const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { db } = require('../database/config');

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const user = await db('users').insert(req.body, '*');
    res.status(200).json(user[0]);
  }catch(err) {
    res.status(400).json({
      errors: [
        {
          msg: err.detail,
          location: err.table
        }
      ]
    });
  }
}

exports.login = async (req, res) => {
  try {
    const user = await db('users').select('*').where('username', req.body.username);
    if(user.length) {
      const isValid = await bcrypt.compare(req.body.password, user[0].password);
      if(isValid) {
        const token = jwt.sign(
          {
            username: user[0].username,
            permissions: user[0].permissions
          }, 
          process.env.JWT_SECRET_KEY, 
          {
            expiresIn: 3600
          }
        );
        res.status(200).json({
          msg: "Login successful.",
          token: token
        })
      }else {
        throw { errors: [
            { 
              msg: "Invalid credentials." 
            }
          ] 
        }
      }
    }else {
      throw { errors: [
          { 
            msg: "Invalid credentials." 
          }
        ] 
      }
    }
  }catch(err) {
    res.status(400).json(err)
  }
}