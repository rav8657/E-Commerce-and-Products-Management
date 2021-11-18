const mongoose = require('mongoose')



const authorSchema = new mongoose.Schema({

    "author_name": "string",
    "age": "number",
    "address": "string"

})

module.exports = mongoose.model('myAuthor', authorSchema)