const aws = require('aws-sdk')
const userModel = require('../models/userModel')
const validator = require('../validators/validator')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

//....................AWS S3 PART.............................

aws.config.update({
    accessKeyId: "AKIAY3L35MCRRMC6253G",
    secretAccessKey: "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",
    region: "ap-south-1",
})

const uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {

        const s3 = new aws.S3({ apiVersion: "2006-03-01" })

        const uploadParams = {
            ACL: "public-read",
            Bucket: "classroom-training-bucket", //A bucket is a container for objects to store an object in Amazon S3.
            Key: "Hercules/User/" + new Date() + file.originalname,
            Body: file.buffer,
        }

        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err });
            }
            return resolve(data.Location)
        });
    });
};
//..................................................................
const register = async function (req, res) {
    try {
        let files = req.files

        let requestBody = req.body

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide user Detaills" })
        }
        //Extract body
        let { fname, lname,  email, phone, password, address, profileImage } = requestBody

        //-------Validation Starts-----------

        if (!validator.isValid(fname)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide fname" });
        }
        if (!validator.isValid(lname)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide lname" });
        }

        if (!validator.isValid(email)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide email" });
        }

        //validating email using RegEx.
        email = email.trim()
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` });
        }

        let isEmailAlredyPresent = await userModel.findOne({ email: email })
        if (isEmailAlredyPresent) {
            return res.status(400).send({ status: false, message: `Email Already Present` });
        }
        phone = phone.trim()
        if (!validator.isValid(phone)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Phone" });
        }
        //validating phone number of 10 digits only.
        if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone)) {
            return res.status(400).send({ status: false, message: `Mobile should be a valid number` });
        }
        let isPhoneAlredyPresent = await userModel.findOne({ phone: phone })
        if (isPhoneAlredyPresent) {
            return res.status(400).send({ status: false, message: `Phone Number Already Present` });
        }
        if (!validator.isValid(password)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide password" });
        }
        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " });
        }

        if (!validator.isValid(address)) {
            return res.status(400).send({ status: false, message: "Address is required" });
        }

        // Shipping Adress validation
        if (address.shipping) {
            if (address.shipping.street) {
                if (!validator.isValidRequestBody(address.shipping.street)) {
                    return res.status(400).send({ status: false, message: 'Shipping Street Required' });
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. Shipping street cannot be empty" });
            }
            if (address.shipping.city) {
                if (!validator.isValidRequestBody(address.shipping.city)) {
                    return res.status(400).send({ status: false, message: 'Shipping city is Required' });
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. Shipping city cannot be empty" });
            }
            if (address.shipping.pincode) {
                if (!validator.isValidRequestBody(address.shipping.pincode)) {
                    return res.status(400).send({ status: false, message: 'Shipping pincode Required' });
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. Shipping pincode cannot be empty" })
            }
        } else { return res.status(400).send({ status: false, message: "Invalid request parameters, Shipping address cannot be empty" }) }

        // Billing Adress validation

        if (address.billing) {
            if (address.billing.street) {
                if (!validator.isValidRequestBody(address.billing.street)) {
                    return res.status(400).send({ status: false, message: 'billing Street Required' })
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. billing Street cannot be empty" })
            }
            if (address.billing.city) {
                if (!validator.isValidRequestBody(address.billing.city)) {
                    return res.status(400).send({ status: false, message: 'billing city Required' })
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. billing city cannot be empty" })
            }
            if (address.billing.pincode) {
                if (!validator.isValidRequestBody(address.billing.pincode)) {
                    return res.status(400).send({ status: false, message: 'billing pincode Required' })
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. billing pincode cannot be empty" })
            }
        } else { return res.status(400).send({ status: false, message: "Invalid request parameters, Billing address cannot be empty" }) }


        if (!(files && files.length > 0)) {
            return res.status(400).send({ status: false, message: "Invalid request parameter, please provide profile image" })
        }

        //------------Validation Ends----------

        profileImage = await uploadFile(files[0]);

        password = await bcrypt.hash(password, saltRounds);

        const udatedBody = { fname, lname, email, phone, password, address, profileImage }

        let user = await userModel.create(udatedBody)

        res.status(201).send({ status: true, message: 'User created successfully', data: user })

    } catch (error) {

        res.status(500).send({ status: false, msg: error.message })
    }
}

//..................................................................

const login = async (req, res) => {

    try {
        const requestBody = req.body;

        // Extract params

        const { email, password } = requestBody;

        // Validation starts

        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "Please enter login credentials" });
        }

        if (!validator.isValid(email)) {
            res.status(400).send({ status: false, msg: "Enter an email" });
            return;
        }
        //email = email.trim()
        if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` });
        }

        if (!validator.isValid(password)) {
            res.status(400).send({ status: false, msg: "enter a password" });
            return;
        }

        if (!(password.length >= 8 && password.length <= 15)) {
            return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
        }
        // Validation ends
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send({ status: false, message: `Invalid login credentials` });
        }

        let hashedPassword = user.password

        const encryptedPassword = await bcrypt.compare(password, hashedPassword)

        if (!encryptedPassword) return res.status(401).send({ status: false, message: `Invalid login credentials` });

        const token = jwt.sign({
            userId: user._id,
            iat: Math.floor(Date.now() / 1000),   //time of issuing the token.
            exp: Math.floor(Date.now() / 1000) + 3600 * 24 * 7 //+ 60 * 30 setting token expiry time limit.
        }, 'Hercules')


        res.header("BearerToken", token);

        res.status(200).send({ status: true, msg: "successful login", data: { userId: user._id, token: token } });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: error.message });
    }
}


//..............................................................

const getUserProfile = async (req, res) => {

    try {
        const userId = req.params.userId
        const userIdFromToken = req.userId

        //validation starts

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId in params." })
        }
        //validation ends

        const findUserProfile = await userModel.findOne({ _id: userId })
        if (!findUserProfile) {
            return res.status(400).send({
                status: false, message: `User doesn't exists by ${userId}`
            })
        }
        //Checking the authorization of the user -> Whether user's Id matches with the book creater's Id or not.
        if (userIdFromToken != findUserProfile._id) {
            return res.status(403).send({
                status: false,
                message: "Unauthorized access."
            })
        }

        return res.status(200).send({ status: true, message: "Profile found successfully.", data: findUserProfile })
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error is: " + err.message
        })
    }
}



//..................................................................
const updateUserProfile = async (req, res) => {

    try {
        let files = req.files
        let requestBody = req.body
        let userId = req.params.userId
        let userIdFromToken = req.userId

        if (!validator.isValidObjectId(userId)) {
            res.status(400).send({ status: false, message: `${userId} is not a valid user id` })
            return
        }
        if (!validator.isValidObjectId(userIdFromToken)) {
            return res.status(400).send({ status: false, message: `Unauthorized access! User's info doesn't match ` })
        }
        const findUserProfile = await userModel.findOne({ _id: userId })
        if (!findUserProfile) {
            return res.status(400).send({
                status: false,
                message: `User doesn't exists by ${userId}`
            })
        }
        if (findUserProfile._id.toString() != userIdFromToken) {
            res.status(401).send({ status: false, message: `Unauthorized access! User's info doesn't match` });
            return
        }
        // Extract params
        let { fname, lname, email, phone, password, address, profileImage } = requestBody;

        //validations for updatation details.
        if (!validator.validString(fname)) {
            return res.status(400).send({ status: false, message: 'fname is Required' })
        }
        if (fname) {
            if (!validator.isValid(fname)) {
                return res.status(400).send({ status: false, message: "Invalid request parameter, please provide fname" })
            }
        }
        if (!validator.validString(lname)) {
            return res.status(400).send({ status: false, message: 'lname is Required' })
        }
        if (lname) {
            if (!validator.isValid(lname)) {
                return res.status(400).send({ status: false, message: "Invalid request parameter, please provide lname" })
            }
        }
        if (!validator.validString(email)) {
            return res.status(400).send({ status: false, message: 'email is Required' })
        }
        if (email) {
            if (!validator.isValid(email)) {
                return res.status(400).send({ status: false, message: "Invalid request parameter, please provide email" })
            }
            if (!/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email)) {
                return res.status(400).send({ status: false, message: `Email should be a valid email address` });
            }
            let isEmailAlredyPresent = await userModel.findOne({ email: email })
            if (isEmailAlredyPresent) {
                return res.status(400).send({ status: false, message: `Unable to update email. ${email} is already registered.` });
            }
        }
        if (!validator.validString(phone)) {
            return res.status(400).send({ status: false, message: 'phone number is Required' })
        }
        if (phone) {
            if (!validator.isValid(phone)) {
                return res.status(400).send({ status: false, message: "Invalid request parameter, please provide Phone number." })
            }
            if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone)) {
                return res.status(400).send({ status: false, message: `Please enter a valid Indian phone number.` });
            }
            let isPhoneAlredyPresent = await userModel.findOne({ phone: phone })
            if (isPhoneAlredyPresent) {
                return res.status(400).send({ status: false, message: `Unable to update phone. ${phone} is already registered.` });
            }
        }
        if (!validator.validString(password)) {
            return res.status(400).send({ status: false, message: 'password is Required' })
        }
        let tempPassword = password
        if (tempPassword) {
            if (!validator.isValid(tempPassword)) {
                return res.status(400).send({ status: false, message: "Invalid request parameter, please provide password" })
            }
            if (!(tempPassword.length >= 8 && tempPassword.length <= 15)) {
                return res.status(400).send({ status: false, message: "Password should be Valid min 8 and max 15 " })
            }
            var encryptedPassword = await bcrypt.hash(tempPassword, saltRounds)
        }
        //Address validation ->
        if (address) {
            //converting shipping address to string them parsing it.
            let shippingAddressToString = JSON.stringify(address)
            let parsedShippingAddress = JSON.parse(shippingAddressToString)

            if (validator.isValidRequestBody(parsedShippingAddress)) {
                if (parsedShippingAddress.hasOwnProperty('shipping')) {
                    if (parsedShippingAddress.shipping.hasOwnProperty('street')) {
                        if (!validator.isValid(parsedShippingAddress.shipping.street)) {
                            return res.status(400).send({ status: false, message: " Invalid request parameters. Please provide shipping address's Street" });
                        }
                    }
                    if (parsedShippingAddress.shipping.hasOwnProperty('city')) {
                        if (!validator.isValid(parsedShippingAddress.shipping.city)) {
                            return res.status(400).send({ status: false, message: " Invalid request parameters. Please provide shipping address's City" });
                        }
                    }
                    if (parsedShippingAddress.shipping.hasOwnProperty('pincode')) {
                        if (!validator.isValid(parsedShippingAddress.shipping.pincode)) {
                            return res.status(400).send({ status: false, message: " Invalid request parameters. Please provide shipping address's pincode" });
                        }
                    }
                    var shippingStreet = address.shipping.street
                    var shippingCity = address.shipping.city
                    var shippingPincode = address.shipping.pincode
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. Shipping address cannot be empty" });
            }
        }
        if (address) {
            //converting billing address to string them parsing it.
            let billingAddressToString = JSON.stringify(address)
            let parsedBillingAddress = JSON.parse(billingAddressToString)

            if (validator.isValidRequestBody(parsedBillingAddress)) {
                if (parsedBillingAddress.hasOwnProperty('billing')) {
                    if (parsedBillingAddress.billing.hasOwnProperty('street')) {
                        if (!validator.isValid(parsedBillingAddress.billing.street)) {
                            return res.status(400).send({ status: false, message: " Invalid request parameters. Please provide billing address's Street" });
                        }
                    }
                    if (parsedBillingAddress.billing.hasOwnProperty('city')) {
                        if (!validator.isValid(parsedBillingAddress.billing.city)) {
                            return res.status(400).send({ status: false, message: " Invalid request parameters. Please provide billing address's City" });
                        }
                    }
                    if (parsedBillingAddress.billing.hasOwnProperty('pincode')) {
                        if (!validator.isValid(parsedBillingAddress.billing.pincode)) {
                            return res.status(400).send({ status: false, message: " Invalid request parameters. Please provide billing address's pincode" });
                        }
                    }
                    var billingStreet = address.billing.street
                    var billingCity = address.billing.city
                    var billingPincode = address.billing.pincode
                }
            } else {
                return res.status(400).send({ status: false, message: " Invalid request parameters. Billing address cannot be empty" });
            }
        }
        if (files) {
            if (validator.isValidRequestBody(files)) {
                if (!(files && files.length > 0)) {
                    return res.status(400).send({ status: false, message: "Invalid request parameter, please provide profile image" })
                }
                var updatedProfileImage = await uploadFile(files[0])
            }
        }
        //Validation ends

        let changeProfileDetails = await userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                fname: fname,
                lname: lname,
                email: email,
                profileImage: updatedProfileImage,
                phone: phone,
                password: encryptedPassword,
                'address.shipping.street': shippingStreet,
                'address.shipping.city': shippingCity,
                'address.shipping.pincode': shippingPincode,
                'address.billing.street': billingStreet,
                'address.billing.city': billingCity,
                'address.billing.pincode': billingPincode
            }
        }, { new: true })
        return res.status(200).send({ status: true, data: changeProfileDetails })
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error is: " + err.message
        })
    }
}


module.exports = {
    register, login, getUserProfile, updateUserProfile
}


