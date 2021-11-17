const express = require('express');
const router = express.Router();

// router.get('/test-me', function (req, res) {
//     res.send('My first ever api!')
// });


//1. class practise

const UserModel = require("../models/userModel")
const UserController = require("../controllers/userController")

const BookModel = require("../models/bookModel")
const BookController = require("../controllers/bookController")


router.post('/createUser', UserController.createUser);

router.get('/getAllUsers', UserController.getUsersData);


// api to create a new book 

router.post('/createBooks', UserController.createBooks);

//and another api to get the list of all books. 

router.get('/getAllBooks', UserController.getBooksData);





//MongoDb first Assignment 1


//createBook : to create a new entry..use this api to create 11+ entries in your collection
router.post('/createBook', BookController.createBook);

//bookList : gives all the books- their bookName and authorName only
router.get('/bookList', BookController.getBooksData);

//getBooksInYear: takes year as input in post request and gives list of all books published that year
router.post('/getBooksInYear', BookController.getBooksInYear);

//getParticularBooks:- (this is a good one, make sincere effort to solve this) take any input and use it as a condition to fetch books that satisfy that condition 	
// e.g if body had { name: “hi”} then you would fetch the books with this name
// if body had { year: 2020} then you would fetch the books with this name
// hence the condition will differ based on what you input in the request body

router.post('/getParticularBooks', BookController.getParticularBooks);


//getXINRBooks- request to return all books who have an Indian price tag of “100INR” or “200INR” or “500INR”
router.post('/getXINRBooks', BookController.getXINRBooks);

//getRandomBooks - returns books that are available in stock or have more than 500 pages
router.post('/getRandomBooks', BookController.getRandomBooks);




//Assignment 2

//Write create APIs for both books and authors
const newBookModel = require("../models/newbookModel")
const authorModel = require("../models/authorModel")
const authorController = require("../controllers/authorController")
const newbookController = require("../controllers/newbookController")



router.post('/createnewBook', newbookController.createnewBook);

router.post('/createAuthor', authorController.createAuthor);

router.get('/ChetanBhagat', newbookController.ChetanBhagat);

router.get('/priceUpdate', newbookController.priceUpdate);

router.get('/findByName', newbookController.findByName);



module.exports = router;

