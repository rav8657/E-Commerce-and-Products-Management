const express = require("express");
const router = express.Router();

const  blogController = require('../controllers');

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});




// router.post('/blogs',  blogController.createBlog);
// router.get('/blogs',  blogController.listBlog);
// router.put('/blogs/:blogId',  blogController.updateBlog);
// router.delete('/blogs/:blogId',  blogController.deleteBlogByID);
// router.delete('/blogs',  blogController.deleteBlogByParams);

module.exports = router;