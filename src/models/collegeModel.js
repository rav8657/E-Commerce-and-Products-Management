
// { name: { mandatory, unique, example iith},
//  fullName: {mandatory, example `Indian Institute of Technology, Hyderabad`}, 
//logoLink: {mandatory},
//   isDeleted: {boolean, default: false} }



const mongoose = require('mongoose') 

const collegeSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true,lowercase:true,trim:true },

    fullName: { type: String, require: true,trim:true },

    logoLink: {type: String, required: true,trim:true},
    
    isDeleted:{
        type:Boolean,
        default:false
    }
}, {timestamps: true})

module.exports = mongoose.model('College', collegeSchema)