const express = require("express");
const router = express.Router();
const appMiddleware = require("../middlewares/appMiddleware");
const userController = require("../controllers/userController");

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});


router.post('/createUser', userController.createUser);
router.post('/login', userController.login);
router.get('/users/:userId', appMiddleware.checkAuthentication, userController.users);
router.put('/updateUser/:userId', appMiddleware.checkAuthentication, userController.updateUser);

//GET ALLUSER DETAILS
router.get('/getUser', userController.getUser);
module.exports = router;