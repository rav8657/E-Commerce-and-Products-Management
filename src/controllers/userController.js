const userModel = require("../models/userModel")
//const validator = require('../validators/validator')
const jwt = require('jsonwebtoken')


// //--------------------------functions---------------------------//

const isValid = function (value) {
    if (typeof (value) === 'undefined' || typeof (value) === 'null') { return false } 
    if (typeof (value) === 'string' && value.trim().length > 0) { return true } 
}
const isValidTitle = function (title) {
    return ['Mr', 'Mrs', 'Miss'].indexOf(title) !== -1
}
const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



const createUser = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide user details' })
        }
       
        const { title, name, phone, email, password, address } = requestBody; 
       
        if (!isValid(title)) {
            return res.status(400).send({ status: false, message: 'title is required or check key and value' })
        }
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required or check key and value' })
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: 'phone is required or check key' })
        }

        // if (!/^[0-9]\d{9}$/gi.test(mobile)) {
    if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone.trim())) {
        //if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
          res.status(400).send({
            status: false,
            message: `Phone should be a valid number`
          });
          return;
        }
        const isphoneNumberAlreadyUsed = await userModel.findOne({ phone }); 


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
        if (!(password.length >= 8 && password.length <= 15)) {       
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
        }

        //.......................................

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })
        }
        const isEmailAlreadyUsed = await userModel.findOne({ email }); 
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `email address is already registered` })
        }

        //.....................................Address
        // if (!validator.validAddress(address)) {
        //     return res.status(400).send({ status: false, message: "Please provide address or check key value ." })
        // }
        // if (address) {
        //     if (!validator.isValid(address.street)) {
        //         return res.status(400).send({ status: false, message: "Street address cannot be empty or check key value ." })
        //     }
        //     if (!validator.isValid(address.city)) {
        //         return res.status(400).send({ status: false, message: "City cannot be empty or check key value ." })
        //     }
        //     if (!validator.isValid(address.pincode)) {
        //         return res.status(400).send({ status: false, message: "Pincode cannot be empty or check key value ." })
        //     }
        // }


        //.........................................
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
            res.status(400).send({ status: false, msg: "enter an email or check key name" });
            return;
        }

        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` });
        }

        if (!isValid(password)) {
            res.status(400).send({ status: false, msg: "enter a password or check key name" });
            return;
        }

        if (!(password.length >= 8 && password.length <= 15)) {        
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
        }
        const user = await userModel.findOne({ email: email, password: password });  

        if (!user) {
            res.status(401).send({ status: false, msg: " Either email or password incorrect" });
            return;
        }

        const token = jwt.sign({
           userId: user._id,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 60 * 30
        }, 'Magnificent')

        res.header("x-api-key", token);
        
        res.status(201).send({ status: true, msg: "successful login", token: { token } });
    } catch (error) {
        res.status(500).send({ status: false, msg: error.message });
    }
}

module.exports = {
    createUser, loginUser
}