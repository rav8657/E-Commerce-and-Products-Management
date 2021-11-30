const blogModel = require('../models/blogModel')
const authorModel = require('../models/authorModel')


const createBlog = async function (req, res) {


  try {
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

  } catch (err) {
    console.log(err.message);
    res.status(500).send({ msg: "There is some error" })
  }
}

const getBlogs = async function (req, res) {


  try {
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
  }
  catch (error) {
    res.status(404).send({ msg: "error-response-status" })
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

    const updatedBlog = await blogModel.findOneAndUpdate({ _id: blogId }, { title: title, body: body, tags: tags, subcategory: subcategory, isPublished: isPublished }, { new: true })
    if (updatedBlog.isPublished == true) {

      updatedBlog.publishedAt = new Date()

    }
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
      res.status(200).send({ msg: "deleted" })
    }
    else {
      res.status(404).send({ msg: "invalid blogId" })
    }
  }
  catch (error) {
    res.status(500).send({ err: error })
  }
}



//delete by params
const deletebyparams = async function (req, res) {
  try {
    let updatedfilter = {}

    console.log(updatedfilter)
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
    console.log(updatedfilter)
    let deleteData = await blogModel.updateMany(updatedfilter, {
      isDeleted: true,
      deletedAt: new Date(),
    });
    console.log(updatedfilter)
    if (deleteData) {
      res.status(200).send({ status: true, msg: "Blog has been deleted" });
    } else {
      res.status(404).send({ status: false, msg: "No such blog exist" });
    }
  } catch (error) {
    res.status(500).send({ status: false, msg: error });
  }
}


module.exports.createBlog = createBlog;
module.exports.getBlogs = getBlogs;
module.exports.updateBlog = updateBlog;
module.exports.checkdeletestatus = checkdeletestatus;
module.exports.deletebyparams = deletebyparams;