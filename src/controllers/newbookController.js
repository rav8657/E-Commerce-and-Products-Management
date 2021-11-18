const newbookModel = require("../models/newbookModel.js")

const authorModel = require("../models/authorModel.js")

const publisherModel = require("../models/publisherModel.js")



const myBook = async function (req, res) {
    let data = req.body;
    let authorId = req.body.author
    let savedData = await authorModel.findById(authorId)
    if (savedData) {
        let bookCreated = await newbookModel.create(data)
        res.send({ data: bookCreated })
    } else {
        res.send("The author Id is Invalid")
    }

}


// 5. Update the 3rd api (GET /books) such that in the authors details you receive _id, author_name and age.

const getBooks = async function (req, res) {
    let allBooks = await newbookModel.find().populate('author', ["author_name", "age"]).populate('publisher')
    res.send(allBooks)
}



const mypublisher = async function (req, res) {
    let data = req.body
    let savedData = await publisherModel.create(data);
    res.send({ data: savedData });

}





module.exports.myBook = myBook

module.exports.getBooks = getBooks

module.exports.mypublisher = mypublisher