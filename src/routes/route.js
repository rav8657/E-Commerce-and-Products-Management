const express = require('express')
const router = express.Router()


const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')



// User routes
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);



router.post('/books',  bookController.createBook)

router.get('/books', bookController.getAllBooks)
router.get('/books/:bookId', bookController.getBookDetails)


module.exports = router;