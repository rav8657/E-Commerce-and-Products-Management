const aws = require("aws-sdk");
const productModel = require('../models/productModel')
const validator = require('../validators/validator')
const currencySymbol = require("currency-symbol-map")


//....................AWS PART....................................

aws.config.update({
    accessKeyId: "AKIAY3L35MCRRMC6253G",// id
    secretAccessKey: "88NOFLHQrap/1G2LqUy9YkFbFRe/GNERsCyKvTZA",// your secret password
    region: "ap-south-1",// Mumbai region
})

const uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
// Create S3 service object
        const s3 = new aws.S3({ apiVersion: "2006-03-01" })

        const uploadParams = {
            ACL: "public-read",// this file is publically readable
            Bucket: "classroom-training-bucket",
            Key: "Hercules/Product/" + new Date() + file.originalname,
            Body: file.buffer,
        }
// Callback - function provided as the second parameter ( most oftenly)
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                return reject({ "error": err })
            }
            return resolve(data.Location)
        })
    })
}
//..................................................................

//creating product by validating all details.
const createProduct = async (req, res) => {
    try {
        const requestBody = req.body;

        //validating empty req body.
        if (!validator.isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid params received in request body' })
        }

        //extract params for request body.
        const { title, description, price, currencyId, isFreeShipping, style, availableSizes, installments } = requestBody;

        //validation for the params starts.
        if (!validator.isValid(title)) {
            return res.status(400).send({ status: false, message: 'Title is required' })
        }

        //searching title in DB to maintain their uniqueness.
        const isTitleAlreadyUsed = await productModel.findOne({ title });

        if (isTitleAlreadyUsed) {
            return res.status(400).send({ status: false, message: 'Title is already used.' })
        }

        if (!validator.isValid(description)) {
            return res.status(400).send({ status: false, message: 'Description is required' })
        }

        if (!validator.isValid(price)) {
            return res.status(400).send({ status: false, message: 'Price is required' })
        }

        if (!(!isNaN(Number(price)))) {
            return res.status(400).send({ status: false, message: `Price should be a valid number` })
        }
        if (price <= 0) {
            return res.status(400).send({ status: false, message: `Price should be a valid number` })
        }

        if (!validator.isValid(currencyId)) {
            return res.status(400).send({ status: false, message: 'CurrencyId is required' })
        }

        if (!(currencyId == "INR")) {
            return res.status(400).send({ status: false, message: 'currencyId should be INR' })
        }

        if (installments) {
            if (!validator.validInstallment(installments)) {
                return res.status(400).send({ status: false, message: "installments can't be a decimal number & must be greater than equalto zero " })
            }
        }

        if (validator.isValid(isFreeShipping)) {

            if (!((isFreeShipping === "true") || (isFreeShipping === "false"))) {
                return res.status(400).send({ status: false, message: 'isFreeShipping must be a boolean value' })
            }
        }
        //uploading product image to AWS.
        let productImage = req.files;
        if (!(productImage && productImage.length > 0)) {
            return res.status(400).send({ status: false, msg: "productImage is required" });
        }

        let productImageUrl = await uploadFile(productImage[0]);

        //object destructuring for response body.
        const newProductData = {

            title,
            description,
            price,
            currencyId,
            currencyFormat: currencySymbol(currencyId),
            isFreeShipping,
            style,
            installments,
            productImage: productImageUrl
        }

        if (!validator.isValid(availableSizes)) {
            return res.status(400).send({ status: false, message: 'available Sizes is required' })
        }

        //validating sizes to take multiple sizes at a single attempt.
        if (availableSizes) {
            let array = availableSizes.split(",").map(x => x.trim())

            for (let i = 0; i < array.length; i++) {
                if (!(["S", "XS", "M", "X", "L", "XXL", "XL"].includes(array[i]))) {
                    return res.status(400).send({ status: false, message: `Available Sizes must be among ${["S", "XS", "M", "X", "L", "XXL", "XL"].join(', ')}` })
                }
            }

            //using array.isArray function to check the value is array or not.
            if (Array.isArray(array)) {
                newProductData['availableSizes'] = array
            }
        }

        const saveProductDetails = await productModel.create(newProductData)
        res.status(201).send({ status: true, message: "Success", data: saveProductDetails })

    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, data: error });
    }
}

//!......................................................
//Get all products.
const getAllProducts = async (req, res) => {
    try {
        const filterQuery = { isDeleted: false } //complete object details.
        const queryParams = req.query;

        if (validator.isValidRequestBody(queryParams)) {

            const { size, name, priceGreaterThan, priceLessThan, priceSort } = queryParams;

            //validation starts.
            if (validator.isValid(size)) {
                filterQuery['availableSizes'] = size
            }

            //using $regex to match the subString of the names of products & "i" for case insensitive.
            if (validator.isValid(name)) {
                filterQuery['title'] = {}
                filterQuery['title']['$regex'] = name
                filterQuery['title']['$options'] = 'i'
            }

            //setting price for ranging the product's price to Get/fetch them.
            if (validator.isValid(priceGreaterThan)) {

                if (!(!isNaN(Number(priceGreaterThan)))) {
                    return res.status(400).send({ status: false, message: `priceGreaterThan should be a valid number` })
                }
                if (priceGreaterThan <= 0) {
                    return res.status(400).send({ status: false, message: `priceGreaterThan should be a valid number` })
                }
                if (!Object.prototype.hasOwnProperty.call(filterQuery, 'price'))
                    filterQuery['price'] = {}
                filterQuery['price']['$gte'] = Number(priceGreaterThan)

            }

            //setting price for ranging the product's price to Get/fetch them.
            if (validator.isValid(priceLessThan)) {

                if (!(!isNaN(Number(priceLessThan)))) {
                    return res.status(400).send({ status: false, message: `priceLessThan should be a valid number` })
                }
                if (priceLessThan <= 0) {
                    return res.status(400).send({ status: false, message: `priceLessThan should be a valid number` })
                }
                if (!Object.prototype.hasOwnProperty.call(filterQuery, 'price'))
                    filterQuery['price'] = {}
                filterQuery['price']['$lte'] = Number(priceLessThan)

            }

            //sorting the products acc. to prices => 1 for ascending & -1 for descending.
            if (validator.isValid(priceSort)) {

                if (!((priceSort == 1) || (priceSort == -1))) {
                    return res.status(400).send({ status: false, message: `priceSort should be 1 or -1 ` })
                }

                const products = await productModel.find(filterQuery).sort({ price: priceSort })

                if (Array.isArray(products) && products.length === 0) {
                    return res.status(404).send({ statuproductss: false, message: 'No Product found' })
                }

                return res.status(200).send({ status: true, message: 'Product list', data: products })
            }
        }

        const products = await productModel.find(filterQuery)

        //verifying is it an array and having some data in that array.
        if (Array.isArray(products) && products.length === 0) {
            return res.status(404).send({ statuproductss: false, message: 'No Product found' })
        }

        return res.status(200).send({ status: true, message: 'Product list', data: products })
    } catch (error) {
        return res.status(500).send({ success: false, error: error.message });
    }
}

//!....................................................
//fetch products by Id.
const getProductsById = async function (req, res) {
    try {
        const productId = req.params.productId

        //validation starts.
        if (!validator.isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: `${productId} is not a valid product id` })
        }
        //validation ends.
        const product = await productModel.findOne({ _id: productId, isDeleted: false });

        if (!product) {
            return res.status(404).send({ status: false, message: `product does not exit` })
        }

        return res.status(200).send({ status: true, message: 'Success', data: product })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error is : " + err })
    }
}

//!...................................................
//Update product details.
const updateProduct = async function (req, res) {
    try {
        const requestBody = req.body
        // const params = req.params
        const productId = req.params.productId

        // Validation starts
        if (!validator.isValidObjectId(productId)) {
            return res.status(404).send({ status: false, message: `${productId} is not a valid product id` })
        }

        const product = await productModel.findOne({ _id: productId, isDeleted: false })

        if (!product) {
            return res.status(404).send({ status: false, message: `product not found` })
        }

        if (!(validator.isValidRequestBody(requestBody) || req.files)) {
            return res.status(400).send({ status: false, message: 'No paramateres passed. product unmodified' })
        }

        // Extract params
        const { title, description, price, currencyId, isFreeShipping, style, availableSizes, installments } = requestBody;

        //Declaring an empty object then using hasOwnProperty to match the keys and setting the appropriate values.   
        const updatedProductDetails = {}

        if (validator.isValid(title)) {

            const isTitleAlreadyUsed = await productModel.findOne({ title, _id: { $ne: productId } });

            if (isTitleAlreadyUsed) {
                return res.status(400).send({ status: false, message: `${title} title is already used` })
            }

            if (!updatedProductDetails.hasOwnProperty('title'))
                updatedProductDetails['title'] = title
        }

        if (validator.isValid(description)) {
            if (!updatedProductDetails.hasOwnProperty('description'))
                updatedProductDetails['description'] = description
        }

        //verifying price is number & must be greater than 0.
        if (validator.isValid(price)) {

            if (!(!isNaN(Number(price)))) {
                return res.status(400).send({ status: false, message: `Price should be a valid number` })
            }

            if (price <= 0) {
                return res.status(400).send({ status: false, message: `Price should be a valid number` })
            }

            if (!updatedProductDetails.hasOwnProperty('price'))
                updatedProductDetails['price'] = price
        }

        //verifying currency Id must be INR.
        if (validator.isValid(currencyId)) {

            if (!(currencyId == "INR")) {
                return res.status(400).send({ status: false, message: 'currencyId should be a INR' })
            }

            if (!updatedProductDetails.hasOwnProperty('currencyId'))
                updatedProductDetails['currencyId'] = currencyId;

        }

        //shipping must be true/false.
        if (validator.isValid(isFreeShipping)) {

            if (!((isFreeShipping === "true") || (isFreeShipping === "false"))) {
                return res.status(400).send({ status: false, message: 'isFreeShipping should be a boolean value' })
            }

            if (!updatedProductDetails.hasOwnProperty('isFreeShipping'))
                updatedProductDetails['isFreeShipping'] = isFreeShipping
        }
        //uploading images to AWS.
        let productImage = req.files;
        if ((productImage && productImage.length > 0)) {

            let updatedproductImage = await uploadFile(productImage[0]);

            if (!updatedProductDetails.hasOwnProperty('productImage'))
                updatedProductDetails['productImage'] = updatedproductImage
        }

        if (validator.isValid(style)) {

            if (!updatedProductDetails.hasOwnProperty('style'))
                updatedProductDetails['style'] = style
        }
        //validating sizes to take multiple sizes at a single attempt.
        if (availableSizes) {

            let sizesArray = availableSizes.split(",").map(x => x.trim())

            for (let i = 0; i < sizesArray.length; i++) {
                if (!(["S", "XS", "M", "X", "L", "XXL", "XL"].includes(sizesArray[i]))) {
                    return res.status(400).send({ status: false, message: `availableSizes should be among ${["S", "XS", "M", "X", "L", "XXL", "XL"].join(', ')}` })
                }
            }
            if (!updatedProductDetails.hasOwnProperty(updatedProductDetails, '$set'))
                updatedProductDetails['$set'] = {}
            updatedProductDetails['$set']['availableSizes'] = sizesArray//{ $set: sizesArray }
        }

        //verifying must be a valid no. & must be greater than 0.
        if (installments) {
            if (!validator.validInstallment(installments)) {
                return res.status(400).send({ status: false, message: "installments can't be a decimal number & must be greater than equalto zero " })
            }
            if (!updatedProductDetails.hasOwnProperty('installments'))
                updatedProductDetails['installments'] = installments
        }
        const updatedProduct = await productModel.findOneAndUpdate({ _id: productId }, updatedProductDetails, { new: true })

        return res.status(200).send({ status: true, message: 'Successfully updated product details.', data: updatedProduct });
    } catch (err) {

        return res.status(500).send({
            status: false,
            message: "Error is : " + err
        })
    }
}

//!.................................................
//deleting product by the seller side.

const deleteProduct = async function (req, res) {
    try {
        const params = req.params
        const productId = params.productId

        //validation starts
        if (!validator.isValidObjectId(productId)) {
            return res.status(400).send({ status: false, message: `${productId} is not a valid product id` })
        }

        //vaidation ends.
        const product = await productModel.findOne({ _id: productId, isDeleted: false })

        if (!product) {
            return res.status(404).send({ status: false, message: `product not found` })
        }

        await productModel.findOneAndUpdate({ _id: productId }, { $set: { isDeleted: true, deletedAt: new Date() } })
        return res.status(200).send({ status: true, message: `Product deleted successfully.` })

    } catch (err) {
        return res.status(500).send({ status: false, message: "Error is : " + err })
    }
}


module.exports = {
    createProduct,
    getAllProducts,
    getProductsById,
    updateProduct,
    deleteProduct
}



