const { db } = require('../database/config');
const jwt = require('jsonwebtoken');

exports.getCart = async (req, res) => {
  try {
    if(req.headers.authorization === undefined) {
      throw {
        msg: "Missing cart token."
      }
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const cart = await db.query('SELECT * FROM carts WHERE id=$1', [decoded.id]);
    res.status(200).json(cart.rows[0])
  }catch(err) {
    let error = err.name && err.name === 'JsonWebTokenError' ? { msg: "Invalid cart token." }: err;
    // console.log(err)
    res.status(500).json({errors: [error]});
  }

}       

exports.createCart = async (req, res) => {
  try {
    const cart = await db.query(
      'INSERT INTO carts DEFAULT VALUES RETURNING id;'
    )
    const token = jwt.sign(
      { id: cart.rows[0].id }, 
      process.env.JWT_SECRET_KEY, 
      { expiresIn: '1d' }
    )
    res.status(200).json({token});
  }catch(err) {
    console.log(err)
    res.status(500).json({errors: [err]})
  }
}

exports.deleteCart = async (req, res) => {
  try {
    if(req.headers.authorization === undefined) {
      throw {
        msg: "Missing cart token."
      }
    }
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const cart = await db.query('DELETE FROM products WHERE id=$1', [decoded.id]);
    if(cart.length) {
      res.status(200).json({msg: `Cart ${decoded.id} deleted.`});
    }else {
      throw { errors: [{msg: `Cart ${decoded.id} could not be deleted.`}]}
    }
  }catch(err) {
    console.log(err);
    res.status(400).json({errors: [err]});
  }
}