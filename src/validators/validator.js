const mongoose = require('mongoose')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

//only check empty string value.
const validString = function (value) {
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}
//for product
const validInstallment = function isInteger(value) {
    if(value < 0) return false
     if(value % 1 == 0 ) return true
}
// const validQuantity = function isInteger(value) {
//     if(value < 1) return false
//      if(value % 1 == 0 ) return true
// }

//for product
const validQuantity = function isInteger(value) {
    if (value < 1) return false
    if (isNaN(Number(value))) return false
    if (value % 1 == 0) return true
}

//for order
const isValidStatus = function(status) {
    return ['pending', 'completed', 'cancelled'].indexOf(status) !== -1
}


module.exports = {
    isValid,
    isValidRequestBody,
    isValidObjectId,
    validString,
    validInstallment,
    validQuantity,
    isValidStatus

}