const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')

const MW = require('../middlewares/authMiddleware')



// USER Section
router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/user/:userId/profile',MW.userAuth, userController.getUserProfile)
router.put('/user/:userId/profile',MW.userAuth, userController.updateUserProfile)



module.exports = router;