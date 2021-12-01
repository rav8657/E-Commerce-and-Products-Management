const mongoose = require("mongoose")
const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')


//---------------------2nd-CREATE BLOGS--------------------


const createBlog = async function (req, res) {
  try {
    if (req.user) {
      const blog = req.body;
      if (blog.isPublished == true) {
        blog["publishedAt"] = new Date()
      }
      const id = req.body.authorId;
      let check = await authorModel.findById(id)
      if (check) {
        let write = await blogModel.create(blog);
        res.status(201).send({ msg: "The book is here", write });
      } else {
        res.status(400).send({ msg: "Invalid Credential" })
      }
    }
    else {
      res.status(404).send({ err: "Invalid AuthorId " })
    }

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "There is some error" })
  }
}




//-----------------------3rd-GET BLOGS LIST-----------------------------------




const getBlogs = async function (req, res) {

  try {
    if (req.user) {
      let updatedfilter = {
        isDeleted: false, isPublished: true
      }
      if (req.query.authorId) {
        updatedfilter["authorId"] = req.query.authorId
      }
      if (req.query.category) {
        updatedfilter["category"] = req.query.category
      }
      if (req.query.tags) {
        updatedfilter["tags"] = req.query.tags
      }
      if (req.query.subcategory) {
        updatedfilter["subcategory"] = req.query.subcategory
      }
      let check = await blogModel.find(updatedfilter)
      if (check.length > 0) {
        res.status(200).send({ status: true, data: check })
      }
      else {
        res.status(404).send({ msg: "not find" })
      }
    } else {
      res.status(404).send({ err: "Invalid AuthorId " })
    }
  }
  catch (error) {
    res.status(404).send({ msg: "error-response-status" })
  }
}




//-----------------------------4th- UPDATE BLOG-------------------------------------




const updateBlog = async function (req, res) {
  try {
    const blogId = req.params.blogId
    let title = req.body.title
    let body = req.body.body
    let tags = req.body.tags
    let subcategory = req.body.subcategory
    let isPublished = req.body.isPublished

    const check = await blogModel.findOne({ _id: blogId })
    const authid = check.authorId
    //console.log(authid)
    if (req.user.userId == authid) {
      const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { title: title, body: body, $push: { tags: tags, subcategory: subcategory }, isPublished: isPublished }, { new: true })
      if (updatedBlog.isPublished == true) {
        updatedBlog.publishedAt = new Date()
      }
      res.status(200).send({ status: true, message: 'Blog updated successfully', data: updatedBlog });
    } else {
      res.status(404).send({ msg: "invalid blogId" })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ status: false, message: error.message });
  }
}




//---------------------------------5th-DELETE BLOG WITH ID----------------------------------------


const checkdeletestatus = async function (req, res) {
  try {

    //if (req.user.userId == req.params.authorId) {
    let blogId = req.params.blogId

    const check = await blogModel.findOne({ _id: blogId })
    const authorid = check.authorId
    if (req.user.userId == authorid) {
      let deletedblogs = await blogModel.findOneAndUpdate({ _id: blogId, isDeleted: false }, { isDeleted: true, deletedAt :new Date() })
      if (deletedblogs) {
        res.status(200).send({ msg: "deleted" })
      }

      else {
        res.status(404).send({ msg: "invalid blogId" })
      }
    }
    else {
      res.status(404).send({ err: "Invalid AuthorId " })
    }

  }

  catch (error) {
    res.status(500).send({ err: error })
  }
}





//----------------------------6th-DELETE BLOG WITH QUERY----------------------------------------



const deletebyparams = async function (req, res) {
  try {
    if (req.user.userId == req.query.authorId) {
      let updatedfilter = {}

      //console.log(updatedfilter)
      if (req.query.authorId) {
        updatedfilter["authorId"] = req.query.authorId
      }
      if (req.query.category) {
        updatedfilter["category"] = req.query.category
      }
      if (req.query.tags) {
        updatedfilter["tags"] = req.query.tags
      }
      if (req.query.subcategory) {
        updatedfilter["subcategory"] = req.query.subcategory
      }
      if (req.query.isPublished) {
        updatedfilter["isPublished"] = req.query.isPublished
      }
      //console.log(updatedfilter)

      let deleteData = await blogModel.findOne(updatedfilter)
      if (!deleteData) {
        return res.status(404).send({ status: false, msg: "Given data is Invalid" });
      }

      deleteData.isDeleted = true;
      deleteData.deletedAt = new Date()
      deleteData.save();

      res.status(200).send({ msg: "Succesful", data: deleteData });
    }
    else {
      res.status(404).send({ msg: "Invalid AuthorId" })
    }
  }
  catch (error) {
    res.status(500).send({ msg: error });
  }
}







module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.checkdeletestatus = checkdeletestatus;
module.exports.deletebyparams = deletebyparams;