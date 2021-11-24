const jwt = require("jsonwebtoken");

const checkAuthentication = function (req, res, next) {
    let token = req.headers["x-auth-token"]
    if (token != null) {
        let decodedToken = jwt.verify(token, "radium")
        if (decodedToken) {
            next()
        } else {
            res.send({ msg: "Invalid token" })
        }
    } else {
        res.send({ msg: "request is missing token header is mandatory" })
    }

}

module.exports.checkAuthentication = checkAuthentication