const mongoose = require('mongoose')

//1. Write down the schemas for book  (keeping the data given below in mind). Also create the documents (corresponding to the data given below) in your database.

const newbookSchema = new mongoose.Schema({

    "name": { "type": "string", "required": "true" },
    "author_id": { "type": "string", "required": "true" },
    "price": "String",

    "ratings": "Number"

}, { timestamps: true })

module.exports = mongoose.model('NewBookCollection', newbookSchema)