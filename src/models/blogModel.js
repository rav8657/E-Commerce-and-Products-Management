const mongoose = require('mongoose')

// { title: {mandatory},
//  body: {mandatory},
//   authorId: {mandatory,refs to author model},
//       tags: {array of string},
//        category: {string, mandatory,

//          examples: [technology, entertainment, 
//             life style, food, fashion]},

//              subcategory: {array of string,


//              examples[technology-[web development,
//                  mobile development,
//                   AI, ML etc]] },


//                    createdAt,
//                     updatedAt,

//                      deletedAt: {when the document is deleted},

//                       isDeleted: {boolean, default: false},

//                        publishedAt: {when the blog is published},

//                         isPublished: {boolean, default: false}}


const blogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String, required: true},
    authorId: {required: true, type: mongoose.Types.ObjectId, refs: 'Author'},
    tags: [{type: String}],
    category: {type: String,  required: true},
    subcategory: [{type: String}],
    isPublished: {type: Boolean, default: false},
    publishedAt: {type: Date},
    isDeleted: {type: Boolean, default: false},
    deletedAt: {type: Date},
}, { timestamps: true })

module.exports = mongoose.model('Blog', blogSchema)