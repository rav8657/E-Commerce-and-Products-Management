const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobile: {
        type: String,
        unique: true,
        required: true
    },
    emailId: String,
    gender: { type: String, enum: ['male', 'female', 'LGBTQ'] },
    age: Number,
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)


const booksSchema = new mongoose.Schema({
    "booksName": "string",
    "authorName": "string",
    "category": "string",
    "year": "number"
}, { timestamps: true })
module.exports = mongoose.model('Books', booksSchema)


