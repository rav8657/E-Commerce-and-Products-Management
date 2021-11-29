const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    authorId: {required: true, type: mongoose.Types.ObjectId, ref: 'Author'},
    tags: {type: [String]},
    category: {type: String,  required: true},
    subcategory: {type: [String]},
    isPublished: {type: Boolean, default: false},
    publishedAt: {type: String},
    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: String},
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)