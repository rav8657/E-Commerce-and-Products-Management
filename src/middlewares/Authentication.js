const jwt = require("jsonwebtoken")

const Auth = async function (req, res, next) {
    try {

        let token = req.headers['x-api-key']
        if (!token) {
            res.status(401).send({ status: false, Message: 'Token is missing.' })
        } else {
            let decodedtoken = jwt.verify(token, 'Thunders')
            if (decodedtoken) {
                req.user = decodedtoken
        
                next()
            } else {
                res.status(401).send({ Message: "Authentication Token is missing" })
            }
        }
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
}

module.exports.Auth = Auth