const newbookModel = require("../models/newbookModel.js")

const authorModel = require("../models/authorModel.js")

const createnewBook = async function (req, res) {
    var data = req.body
    let savedData = await newbookModel.create(data)
    res.send({ msg: savedData })
}

//List out the books written by Chetan Bhagat
const ChetanBhagat = async function (req, res) {
    let savedData = await newbookModel.find({ author_id:1})
    // let savedData = await authorModel.find({ author_id:1})
    res.send({ msg: savedData })
}

//find the author of “Two states” and update the book price to 100;  Send back the author_name and updated price in response
const priceUpdate = async function (req, res) {
    let priceUpdateBook = await newbookModel.findOneAndUpdate({ name: "Two states" }, { "price": 100 })
    res.send({ msg: priceUpdateBook })
}

//Find the books which costs between 50-100(50,100 inclusive) and respond back with the author names of respective books

const findByName = async function (req, res) {
    let findName = await newbookModel.find({ sales: { $in: [50, 100] } }).select({ name: 1, _id: 0 })
    res.send({ msg: findName })
}



module.exports.createnewBook = createnewBook
module.exports.priceUpdate = priceUpdate
module.exports.findByName = findByName
module.exports.ChetanBhagat = ChetanBhagat