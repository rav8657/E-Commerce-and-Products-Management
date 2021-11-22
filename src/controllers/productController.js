
//1. Write a POST api to create a product from the product details in request body.


const productModel = require("../models/productModel");

const createProduct = async function (req, res) {
  let productDetails = req.body;
  let productCreated = await productModel.create(productDetails);
  res.send({ data: productCreated });
};

module.exports.createProduct = createProduct














// const createProduct = async function (req, res) {
//     const Orders = req.headers.isFreeApp
//     let savedOrders = await ProductModel.create(Orders)
//     res.send({ msg: savedOrders })
// }

// module.exports.createProduct = createProduct;