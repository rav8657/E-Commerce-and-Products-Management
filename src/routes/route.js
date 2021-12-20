const express = require('express')
const router = express.Router()


const userController = require('../controllers/userController')
const bookController = require('../controllers/bookController')
const reviewController = require('../controllers/reviewController')
// const middle = require('../middlewares/authMiddleware')
const mw = require('../middlewares/authMiddleware')

// User routes
router.post('/register', userController.createUser);
router.post('/login', userController.loginUser);


// Book routes
router.post('/books', mw.authMiddleware, bookController.createBook)
router.get('/books', mw.authMiddleware, bookController.getAllBooks)
router.get('/books/:bookId', mw.authMiddleware, bookController.getBookDetailsById)
router.put('/books/:bookId', mw.authMiddleware, bookController.updateBook)
router.delete('/books/:bookId', mw.authMiddleware, bookController.deleteBookByID)

// Review routes
router.post('/books/:bookId/review', reviewController.addReview)
router.put('/books/:bookId/review/:reviewId', reviewController.updateReview)
router.delete('/books/:bookId/review/:reviewId', reviewController.deleteReview)

module.exports = router;