const mongoose = require('mongoose')


////1. Write down the schemas for authors (keeping the data given below in mind). Also create the documents (corresponding to the data given below) in your database.
const authorSchema = new mongoose.Schema({
    "author_id": { "type": "string", "required": "true" },
    "author_name": "string",
    "age": "number",
    "address": "string"

}, { timestamps: true })

module.exports = mongoose.model('AuthorCollection', authorSchema)