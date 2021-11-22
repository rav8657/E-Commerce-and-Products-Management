const mongoose = require('mongoose')
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");
const orderModel = require("../models/orderModel");

//3. Write a POST api for order purchase that takes a userId and a productId in request body.

const createOrder = async function (req, res) {
  let orderDetails = req.body;
  let user = await userModel.findById(orderDetails.userId);
  if (!user) {
    res.send({ message: "User doesn't exist. Please check userId" });
  }

  let product = await productModel.findById(orderDetails.productId);
  if (!product) {
    res.send({ message: "Product doesn't exist. Please check productId" });
  }

  let isFreeApp = req.isFreeAppUser;
  let orderAmount;

  if (isFreeApp) {
    orderAmount = 0;
  } else if (!isFreeApp && user.balance >= product.price) {
    orderAmount = product.price;
  } else {
    res.send({
      message: "User doesn't have enough balance. Order can't be processed",
    });
  }

  orderDetails.amount = orderAmount;
  orderDetails.isFreeAppUser = isFreeApp;
  orderDetails.date = Date();
  let orderCreated = await orderModel.create(orderDetails);
  if (!isFreeApp && user.balance >= product.price) {
    await userModel.findOneAndUpdate(
      { _id: mongoose.Types.ObjectId(orderDetails.userId) },
      { balance: user.balance - product.price }
    );
    //Check if we can update a document using save method
  }

  res.send({ data: orderCreated });
};

module.exports.createOrder = createOrder

// const createOrders = async function (req, res) {
//     const Orders = req.body
//     let savedOrders = await OrderModel.create(Orders)
//     res.send({ data: savedOrders })
// }

// module.exports.createOrders = createOrders;