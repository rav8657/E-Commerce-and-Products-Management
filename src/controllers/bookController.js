const BookModel = require('../models/bookModel')

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

    const requestBody = req.body;

    if (!isValidRequestBody(requestBody)) {
        return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
    }

    const { title,
        excerpt,
        userId,
        ISBN,
        category,
        subcategory,
        releasedAt } = requestBody;

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

}



module.exports.createBook = createBook
