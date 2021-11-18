const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId




const newbookSchema = new mongoose.Schema({

    "name": { "type": "string", "required": "true" },

    "price": "String",
    "ratings": "Number",

    "author": {
        type: ObjectId,
        ref: "myAuthor"
    },
    "publisher": {
        type: ObjectId,
        ref: "mypublisher"
    }

})

module.exports = mongoose.model('mybook', newbookSchema)