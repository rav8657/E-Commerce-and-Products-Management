// {
//     bookId: {ObjectId, mandatory, refs to book model},
//     reviewedBy: {string, mandatory, default 'Guest', value: reviewer's name},
//     reviewedAt: {Date, mandatory},
//     rating: {number, min 1, max 5, mandatory},
//     review: {string, optional}
//   }

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    bookId: { type: mongoose.Types.ObjectId, ref: 'Book', required: true },

    reviewedBy: {
        type: String,
        required: true,
        default: "Guest"
    },
    reviewedAt: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    deletedAt: Date,    //confirm by menter
    isDeleted: {
        type: Boolean,
        default: false
    },
    review: String,  //not understand what is optional
}, { timestamps: true });

module.exports = mongoose.model('Review', reviewSchema)