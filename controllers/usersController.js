const bcrypt = require('bcrypt');
const { BadRequest } = require('../utils/errors');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const { db } = require('../database/config');

exports.signup = async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    const user = await db.query(
      'INSERT INTO users (username, password, permissions, email) VALUES($1, $2, $3, $4) RETURNING *;', 
      [req.body.username, hashedPassword, req.body.permissions, req.body.email]
    )
    if(!user.rows.length) {
      throw new BadRequest("User not created.")
    }
    res.status(200).json(user);
  }catch(err) {
    next(err)
  }
}

exports.login = async (req, res, next) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE username=$1', [req.body.username])
    if(!user.rows.length) {
      throw new BadRequest('Invalid credentials.');
    }
    const isValid = await bcrypt.compare(req.body.password, user.rows[0].password);
    if(!isValid) {
      throw new BadRequest('Invalid credentials.');
    }
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
  }catch(err) {
    next(err)
  }
}