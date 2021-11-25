const express = require("express");
const router = express.Router();
//const appMiddleware = require("../middlewares/appMiddleware");
//const userController = require("../controllers/userController");
const cowinController = require("../controllers/cowinController")

router.get('/test-me', function (req, res) {
    res.send('My first ever api!')
});

//router.get('/users/:userId', appMiddleware.checkAuthentication, userController.users);

//router.put('/updateUser/:userId', appMiddleware.checkAuthentication, userController.updateUser);







router.get("/cowin/states", cowinController.getStatesList)
router.get("/cowin/districts/:stateId", cowinController.getDistrictsList)

router.get("/cowin/centers", cowinController.getByPin)
router.post("/cowin/getOtp", cowinController.getOtp)

router.post("/cowin/confirmOtp", cowinController.confirmOtp)



router.get("/londonWeather",cowinController.londonWeather)

router.get("/londonTemp",cowinController.londonTemp)


router.get("/getWeather",cowinController.getWeather)



module.exports = router;