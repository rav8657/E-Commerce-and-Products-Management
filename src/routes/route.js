const express = require('express');
const router = express.Router();

// router.get('/test-me', function (req, res) {
//     res.send('My first ever api!')
// });


const authorController = require("../controllers/authorController")
const newbookController = require("../controllers/newbookController")

//1. Write a create author api that creates an author from the details in request body

router.post('/myAuthor', authorController.myAuthor);

//2.  Write a create book api that takes author from the request body. You have to first check if authorId is present as well a valid authorId. A valid authorId is which is present in your authors collection. Also make sure you receive a publisherId in the request and validate this id. A valid publisherId is which is present in your publishers collection.

router.post('/myBook', newbookController.myBook);



// 3. Write a get books api that fetches all the books along with their author details (you have to populate author)

router.get('/getBooks', newbookController.getBooks);

//4. Write a post api that creates a publisher resource from the details in the request body

router.post('/mypublisher', newbookController.mypublisher);



module.exports = router;

