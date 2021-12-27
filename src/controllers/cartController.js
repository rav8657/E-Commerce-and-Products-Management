const cartModel = require('../models/cartModel')
const validator = require('../validators/validator')
const productModel = require('../models/productModel')


const cartCreation = async (req, res) => {
    try {
        let requestBody = req.body
        let cartId = req.body.cartId
        // let productId = req.body.productId

        //validation starts
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide cart details' })
        }
        if (!validator.isValidObjectId(cartId)) {
            return res.status(400).send({ status: false, message: "Invalid cartId in request body." })
        }
        //validation ends

        //extract params
        const { userId, items, totalPrice, totalItems } = requestCartBody

        if (!validator.isValidObjectId(userId)) {
            return res.status(400).send({ status: false, message: "Invalid userId in request body." })
        }
        if (!items && items.length == 0) {
            return res.status(400).send({ status: false, message: "Invalid in request body. Items are required." })
        }
        for (i in items) {
            if (!validator.isValidObjectId(items[i])) {
                return res.status(400).send({ status: false, message: `Invalid ${items[i]} in request body.` })
            }
            const findProduct = await productModel.findOne({ _id: productId })
        }

        const isCartExists = await cartModel.findById({ _id: cartId })
        if (isCartExists) {

        }
    } catch (err) {
        return res.status(500).send({
            status: false,
            message: "Error is : " + err
        })
    }
}

module.exports = {
    cartCreation
}