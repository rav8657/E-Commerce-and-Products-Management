//4. Update the logic in middleware to set the isFreeAppUser attribute in req. Use this attribute in the route handler for populating the isFreeAppUser attributes of User and Order collection.

let validateAppType = function (req, res, next) {
    let appType = req.headers["isfreeapp"]
    //console.log(req.headers)
    if(!appType) {
        res.send({message: 'Missing mandatory header'})
    } else {
        if(appType === 'true') {
            appType = true
        } else {
            appType = false
        }
        req.isFreeAppUser = appType
        next()
    }
}

module.exports.validateAppType = validateAppType