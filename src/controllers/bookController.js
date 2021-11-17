const BookModel= require("../models/bookModel.js")


const createBook= async function (req, res) {
    var data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})    
}


const getBooksData= async function (req, res) {
    let allBooks= await BookModel.find().select({ bookName:1, authorName:1 , _id: 0})
    res.send({msg: allBooks})
}


const getBooksInYear= async function(req,res){
    let allBooks= await BookModel.find({ year: req.body.year })
    res.send({msg: allBooks})  
}


const getParticularBooks= async function(req,res){
    let allBooks= await BookModel.find( req.body ) 
    res.send({msg: allBooks})  
}


const getXINRBooks= async function(req,res){
    let allBooks= await BookModel.find( { 'prices.indianPrice' : {$in: ["100INR", "200INR", "500INR"] } } ) 
    res.send({msg: allBooks})  
}


const getRandomBooks= async function(req,res){
    let allBooks= await BookModel.find({ $or: [ {stockAvailable: true} , { totalPages: {$gt: 200} } ] }) 
    res.send({msg: allBooks}) }


module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksInYear= getBooksInYear
module.exports.getParticularBooks= getParticularBooks 
module.exports.getXINRBooks = getXINRBooks
module.exports.getRandomBooks = getRandomBooks