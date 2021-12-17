const BookModel = require('../models/bookModel')
const mongoose = require('mongoose')
const ReviewModel = require('../models/reviewModel')

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true;
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createBook = async function (req, res) {
    try {
    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
    }

    const { title, excerpt, userId, ISBN, category, subcategory, reviews, deletedAt, isDeleted, releasedAt } = requestBody;

    if (!isValid(title)) {
        return res.status(400).send({ status: false, message: 'Please provide Title' })
    }

    const isTitleAlreadyUsed = await BookModel.findOne({ title });

    if (isTitleAlreadyUsed) {
        return res.status(400).send({ status: false, message: 'Title is already Present.' })
    }

    if (!isValid(excerpt)) {
        return res.status(400).send({ status: false, message: 'Excerpt is required' })
    }

    if (!isValid(userId)) {
        return res.status(400).send({ status: false, message: 'Please provide User id' })
    }

    if (!isValidObjectId(userId)) {
        return res.status(400).send({ status: false, message: `${userId} is an invalid userid` })
    }

    const isUserIdExist = await UserModel.findOne({ _id: userId })

    if (!isUserIdExist) return res.status(400).send({ status: false, message: `${userId} does not exist` })

    if (!isValid(ISBN)) {
        return res.status(400).send({ status: false, message: 'ISBN is required' })
    }

    const isISBNAlreadyUsed = await BookModel.findOne({ ISBN: ISBN });

    if (isISBNAlreadyUsed) {
        return res.status(400).send({ status: false, message: `${ISBN} ISBN  is already in use` });
    }

    if (!isValid(category)) {
        return res.status(400).send({ status: false, message: 'Category is required' })
    }

    if (!isValid(subcategory)) {
        return res.status(400).send({ status: false, message: 'Subcategory is required' })
    }

    if (!isValid(releasedAt)) {
        return res.status(400).send({ status: false, message: `Release date is required` })
    }

    const newBook = await BookModel.create({
        title, excerpt, userId, ISBN, category, subcategory, releasedAt
    });

    return res.status(201).send({ status: true, message: "Book created successfully", data: newBook });
} catch (error) {
    return res.status(500).send({ success: false, error: error.message });
}
}
//--------------------------------------------------------------------

const getAllBooks = async function (req, res) {
    try {
        const filterQuery = { isDeleted: false }
        const queryParams = req.query;

        if (isValidRequestBody(queryParams)) {
            const { userId, category, subcategory } = queryParams;

            if (isValid(userId) && isValidObjectId(userId)) {
                filterQuery['userId'] = userId
            }

            if (isValid(category)) {
                filterQuery['category'] = category.trim()
            }

            if (isValid(subcategory)) {
                filterQuery['subcategory'] = subcategory.trim()
            }
        }

        const books = await BookModel.find(filterQuery).sort({ title: 1 }).select("_id title excerpt userId category releasedAt reviews")

        if (Array.isArray(books) && books.length === 0) {
            return res.status(404).send({ status: false, message: 'No Books found' })
        }

        return res.status(200).send({ status: true, message: 'Books list', data: books })
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}
//---------------------------------------------------------------------------------------------

const getBookDetails = async function (req, res) {
    try {
        const bookId = req.params.bookId.trim()
        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, message: 'Please provide valid bookId' })
        }

        const book = await BookModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) {
            return res.status(404).send({ status: false, message: 'No book found' })
        }

        const reviewsData = await ReviewModel.find({ bookId: bookId, isDeleted: false })
        book['reviewData'] = reviewsData;
        return res.status(200).send({ status: true, message: 'Books list', data: book })
    } catch (error) {
     
        return res.status(500).send({ success: false, error: error.message });
    }
}





module.exports = {
    createBook,
    getAllBooks,
    getBookDetails,

}
