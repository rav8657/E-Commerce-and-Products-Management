const authorModel = require("../models/authorModel.js")




const myAuthor = async function (req, res) {
    var data = req.body
    let savedData = await authorModel.create(data)
    res.send({ msg: savedData })
}



module.exports.myAuthor = myAuthor
