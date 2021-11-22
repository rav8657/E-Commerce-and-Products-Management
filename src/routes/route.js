const express = require("express");
const router = express.Router();
const appMiddleware = require("../middlewares/appMiddleware");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const orderController = require("../controllers/orderController");
router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//user API
router.post("/users", appMiddleware.validateAppType, userController.createUser);

//product API
router.post("/products", productController.createProduct);

//order API
router.post("/orders",appMiddleware.validateAppType,orderController.createOrder);

module.exports = router;