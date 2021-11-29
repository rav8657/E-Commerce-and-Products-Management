const authorModel = require('../models/authorModel')


const createAuthor = async function (req, res) {

    try {
        const name = req.body;
        let create = await authorModel.create(name);
        res.status(200).send({ msg: "The data is here", create });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "There is some error" })
    }

}


module.exports.createAuthor = createAuthor;