const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { db } = require('../database/config');

exports.signup = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = await db.query(
      'INSERT INTO users (username, password, permissions, email) VALUES($1, $2, $3, $4);', 
      [req.body.username, hashedPassword, req.body.permissions, req.body.email]
    )
    if(user.rowCount > 0) {
      res.status(200).json(user);
    }else {
      throw {
        msg: "User not created",
        user: req.body
      }
    }
  }catch(err) {
    // console.log(err);
    res.status(400).json({
      errors: [
        {
          msg: "Server error"
        }
      ]
    });
  }
}

exports.login = async (req, res) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE username=$1', [req.body.username])
    if(user.rows.length) {
      const isValid = await bcrypt.compare(req.body.password, user.rows[0].password);
      if(isValid) {
        const token = jwt.sign(
          {
            username: user.rows[0].username,
            permissions: user.rows[0].permissions
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
    // console.log(err)
    res.status(400).json(err)
  }
}