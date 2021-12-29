const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const productController = require('../controllers/productController')
const cartController = require('../controllers/cartController')
const orderController = require('../controllers/orderController')
const MW = require('../middlewares/authMiddleware')



//*...... USER SECTION APIs
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/user/:userId/profile', MW.userAuth, userController.getUserProfile)
router.put('/user/:userId/profile', MW.userAuth, userController.updateUserProfile)


//*...... PRODUCT SECTION APIs
router.post('/products', productController.createProduct)
router.get('/products', productController.getAllProducts)
router.get('/products/:productId', productController.getProductsById)
router.put('/products/:productId', productController.updateProduct)
router.delete('/products/:productId', productController.deleteProduct)


//*...... CART SECTION APIs
router.post('/users/:userId/cart', cartController.cartCreation)
router.put('/users/:userId/cart', cartController.updateCart)
router.get('/users/:userId/cart', cartController.getCart)
router.delete('/users/:userId/cart', cartController.deleteCart)


//*...... ORDER SECTION APIs
router.post('/users/:userId/orders', orderController.orderCreation)
router.put('/users/:userId/orders', orderController.updateOrder)


module.exports = router;