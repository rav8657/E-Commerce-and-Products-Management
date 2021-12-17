const userModel = require("../models/userModel")

const jwt = require('jsonwebtoken')

// //--------------------------functions---------------------------//
const isValid = function (value) {
    if (typeof (value) === 'undefined' || typeof (value) === 'null') { return false } //if undefined or null occur rather than what we are expecting than this particular feild will be false.
    if (value.trim().length == 0) { return false } //if user give spaces not any string eg:- "  " =>here this value is empty, only space is there so after trim if it becomes empty than false will be given. 
    if (typeof (value) === 'string' && value.trim().length > 0) { return true } //to check only string is comming and after trim value should be their than only it will be true.
}
const isValidTitle = function (title) {
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



//Q1
const createUser = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide user details' })
        }
        // Extract params
        const { title, name, phone, email, password, address } = requestBody; // Object destructing  //address doubt
        // Validation starts
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'title is required' })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required' })
        }
        if(!isValid(phone)) {
            return res.status(400).send({status: false, message: 'phone is required'})
        }
        //....................................................
        // if (!isValid(phone)) {
        //     res.status(400).send({ status: false, msg: "Mobile Number is required" });
        //     return;
        //   }
      
      
        //   // if (!/^[0-9]\d{9}$/gi.test(mobile)) {
        //   if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone.trim())) {
        //   //if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
        //     res.status(400).send({
        //       status: false,
        //       message: `Mobile should be a valid number`
        //     });
        //     return;
        //   }
      
      
          const isphoneNumberAlreadyUsed = await internModel.findOne({ phone }); // {mobile: mobile} object shorthand property
      
      
          if (isphoneNumberAlreadyUsed) {
            res.status(400).send({ status: false, message: `${phone} phone number is already registered`, });
            return;
          }
      
        //....................................................

        if (!isValidTitle(title)) {
            return res.status(400).send({ status: false, message: `Title should be among Mr, Mrs, and Miss` })
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: `password is required` })
        }
        //..............................................
        if (!(password.length >= 8 && password.length <= 15)) {        //!---Ask Mentor about spcae
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
        }

        //.......................................

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })
        }
        const isEmailAlreadyUsed = await userModel.findOne({ email }); // {email: email} object shorthand property
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `${email} email address is already registered` })
        }
        // Validation ends
        const userData = { title, name, phone, email, password, address }
        const newUser = await userModel.create(userData);
        res.status(201).send({ status: true, message: `User created successfully`, data: newUser });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


//.....................................................

const loginUser = async function (req, res) {


    try {
        let requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "enter a valid request body" });
        }

        const { email, password } = requestBody;

        if (!isValid(email)) {
            res.status(400).send({ status: false, msg: "enter an email" });
            return;
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` });
        }

        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: "enter a password" });
            return;
        }

        if (!(password.length >= 8 && password.length <= 15)) {        //!---Ask Mentor about spcae
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
        }
        const user = await userModel.findOne({ email: email, password: password });  //! Ask Mentor about email search

        if (!user) {
            res.status(401).send({ status: false, msg: " Either email or password incorrect" });
            return;
        }

        const token = await jwt.sign({
            authorId: user._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 30
        }, 'Magnificent')

        res.header("x-api-key", token);
        //console.log(moment().format("YYYY-MM-DD"))
        res.status(201).send({ status: true, msg: "successful login", token: { token } });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

module.exports = {
    createUser, loginUser
}