const Order = require('../models/orders');

exports.allOrders = (req, res) => {
  Order.find({}, (err, orders) => {
    if(err) {
      return res.status(400).json({
        error: "Order could not be found."
      })
    }else {
      return res.status(200).json(orders)
    }
  })
} 

exports.orderById = (req, res) => {
  console.log(req.params)
  Order.findById(req.params.id, (err, order) => {
    if(err) {
      return res.status(400).json({
        error: "Order not found."
      })
    }else {
      return res.status(200).json(order)
    }
  })
}

exports.completedOrders = (req, res) => {
  Order.find({complete: true}, (err, orders) => {
    if(err) {
      return res.status(400).json({
        error: "Orders not found."
      })
    }else {
      return res.status(200).json(orders)
    }
  })
}

exports.activeOrders = (req, res) => {
  Order.find({complete: false}, (err, orders) => {
    if(err) {
      return res.status(400).json({
        error: "Orders not found."
      })
    }else {
      return res.status(200).json(orders)
    }
  })
}

exports.markCompleted = (req, res) => {
  Order.findById(req.params.id, (err, order) => {
    if(err || order===null) {
      return res.status(400).json({error: "Order could not be updated."})
    }else {
      order.complete = true;
      order.tracking = req.body.tracking;
      order.save();
      return res.status(200).json({msg: `Order ${order._id} has been updated as complete.`})
    }
  })
}