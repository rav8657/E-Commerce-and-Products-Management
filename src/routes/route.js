const express = require("express");
const router = express.Router();
const appMiddleware = require("../middlewares/appMiddleware");
const userController = require("../controllers/userController");

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});




router.get('/users/:userId', appMiddleware.checkAuthentication, userController.users);

router.put('/updateUser/:userId', appMiddleware.checkAuthentication, userController.updateUser);




module.exports = router;