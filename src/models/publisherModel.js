const mongoose = require('mongoose')



const publisherSchema = new mongoose.Schema({

    "name": "string",
    "headQuarter": "string"

})

module.exports = mongoose.model('mypublisher', publisherSchema)