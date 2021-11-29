const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')


const createBlog = async function (req, res) {
    try {
        const book = req.body;
        const id = req.body.authorId;
        let check = await authorModel.findById(id)
        if (check) {
            let write = await blogModel.create(book);
            res.status(201).send({ msg: "The book is here", write });
        } else {
            res.status(400).send({ msg: "Invalid Credential" })
        }


    } catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "There is some error" })
    }



}

const getBlogs = async function (req, res) {
    try {
        // let authorId=req.query
        let getAllBlogs = await blogModel.find({ isDeleted: false, isPublished: true })
        if (getAllBlogs) {
            res.status(200).send({ status: true, data: getAllBlogs })
        } else {
            res.status(400).send({ status: false, msg: "no document found" })
        }
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "server error" })
    }
}

const updateBlog = async function (req, res) {
    try {
        const blogId = req.params.blogId
        // const {title, body, tags, category, subcategory, isPublished} = req.Body
        let title = req.body.title
        let body = req.body.body
        let tags = req.body.tags
        let subcategory = req.body.subcategory
        let isPublished = req.body.isPublished
        const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { title:title,body:body,tags:tags,subcategory:subcategory,isPublished:isPublished }, { new: true })
        res.status(200).send({ status: true, message: 'Blog updated successfully', data: updatedBlog });
    } catch (error) {
        console.log(error)
        res.status(500).send({ status: false, message: error.message });
    }
}
//delete 
const checkdeletestatus = async function (req, res) {
    try {
        let blogId = req.params.blogId
        let deletedblogs = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true })
        if (deletedblogs) {
            res.status(200).send({msg:"deleted"})
        }
        else {
            res.status.send({ msg: "invalid blogId" })
        }
    }
    catch (error) {
        res.status(500).send({ err: error })
    }
}
//delete by params
const deletebyparams = async function (req, res) {
    try {
        let category = req.query.category
        let authorId = req.query.authorId
        let tagname = req.query.tagname
        let subcategory = req.query.subcategory
        let unpublished = req.query.unpublished
        let deletebydetails = await blogModel.findOneAndUpdate({ category:category,authorId:authorId,tags:tagname,subcategory:subcategory,unpublished:unpublished, isDeleted: false }, { isDeleted: true },{new:true})
        if (deletebydetails) {
            res.status(404).send({ msg: "Document is deleted" })
        }
    }
    catch {
        res.status(500).send()
    }
}





module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.checkdeletestatus = checkdeletestatus;
module.exports.deletebyparams = deletebyparams;