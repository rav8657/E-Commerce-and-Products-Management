const express = require("express");
const router = express.Router();
const  authorController = require('../controllers/authorController');
const  blogController = require('../controllers/blogController');
const Middleware=require("../middlewares/Authentication")


//----------------------APIs--------------------------------

// AUTHORS ROUTES

router.post('/authors',  authorController.createAuthor);
router.post('/login',authorController.login)


// BLOGS ROUTES

router.post('/blogs',Middleware.Auth,  blogController.createBlog);
router.get('/blogs',Middleware.Auth,  blogController.getBlogs);
router.put('/blogs/:blogId',Middleware.Auth,  blogController.updateBlog);
router.delete('/blogs/:blogId',Middleware.Auth,  blogController.checkdeletestatus);
router.delete('/blogs',Middleware.Auth,  blogController.deletebyparams);

module.exports = router;