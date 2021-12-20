
// { 
//     title: {string, mandatory, enum[Mr, Mrs, Miss]},
//     name: {string, mandatory},
//     phone: {string, mandatory, unique},
//     email: {string, mandatory, valid email, unique}, 
//     password: {string, mandatory, minLen 8, maxLen 15},
//     address: {
//       street: {string},
//       city: {string},
//       pincode: {string}
//     },
//     createdAt: {timestamp},
//     updatedAt: {timestamp}
//   }




const mongoose = require('mongoose')

let validatephone = function (v) {
    // let re = /^[0-9]\d{9}$/gi;   
    let re = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/;
    //let re = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return re.test(v);
}

const userSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        enum: ["Mr", "Mrs", "Miss"]
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        validate: [validatephone, 'Please fill a valid phone Number'],
        // match: [ /^[0-9]\d{9}$/gi, 'Please fill a valid Mobile Number']
        match: [/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/, 'please fill a valid phone Number']
        //match: [/^(\+\d{1,3}[- ]?)?\d{10}$/,'please fill a valid Mobile Number']
    },
    email: {

        type: String, trim: true, lowercase: true, unique: true, required: true,
        validate: {
            validator: function (email) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            }, message: 'Please fill a valid email address', isAsync: false
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,

    },
    address: {
        street: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        pincode:{
            type: String,
            trim: true
        }
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema)