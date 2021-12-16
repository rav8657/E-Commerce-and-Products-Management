const express = require('express')
const router = express.Router()

const bookController = require('../controllers/bookController')

router.post('/books',  bookController.createBook)

module.exports = router;