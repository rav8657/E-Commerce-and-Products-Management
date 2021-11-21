# radium
Repository for backend cohort - Radium



Route based middlewares
Global middlewares
manages the flow of control

Code reusabality esp for restricted routes

sits between your route and your HANDLER

router.post('/getHomePage', MiddleWareIfLoggedIn , UserController.homePage );

MiddleWareIfLoggedIn(){ if loggedin then call the next function/handler which will give the home page feeds else res.send("please login or register") }


restricted API's

router.get('/homePage', mid1, UserController.feeds ); 
router.get('/profileDetails', mid1, UserController.profileDetails );
router.get('/friendList', mid1, UserController.friendList );
router.get('/changePassword', mid1, UserController.changePassword );



open-to-all API's


router.get('/termsAndConditions', UserController.termsAndConditions );
 router.get('/register', UserController.register );


app.use( midGlobal )

body-parser functions:
getting the post data in req.body
getting the req.body data as JSON
providing the header data in req.header etc etc