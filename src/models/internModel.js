// { name: {mandatory},
//  email: {mandatory,
//      valid email,
//       unique},
//        mobile: {mandatory, valid mobile number, unique},
//         collegeId: {ObjectId, ref to college model,
//              isDeleted: {boolean,
//                  default: false}}

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

let validateEmail = function(email) {
    let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
}
let validateMobile = function(v) {
    //let re = /^[0-9]\d{9}$/gi;   
    //let re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;   
let re = /^\+(?:[0-9] ?){10,12}[0-9]$/;
    return re.test(v);
    }


const internSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "name is required",
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    mobile: {
        type: String,
        trim: true,
        required : true,
        unique:true,
        validate: [validateMobile, 'Please fill a valid Mobile Number'],
        //match: [ /^[0-9]\d{9}$/gi, 'Please fill a valid Mobile Number']
        //match: [/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/, 'please fill a valid Mobile Number']
        match: [/^\+(?:[0-9] ?){10,12}[0-9]$/,'please fill a valid Mobile Number']
    },
    collegeId: {
        type: ObjectId,
        ref: 'College'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
module.exports = mongoose.model('intern', internSchema)