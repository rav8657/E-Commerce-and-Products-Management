const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");


////////////////////////////////////////////////////////////////////////////////////////////////
//PROBLEM 1-GET USER DETAILS (PROTECTED API)   24//11//2021
///////////////////////////////////////////////////////////////////////////////////////////////


const users = async function (req, res) {
  try {
    if (req.validToken._id === req.params.userId) {
      let userId = req.params.userId
      let userDetails = await userModel.findOne({ _id: userId, isDeleted: false })
      if (userDetails) {
        res.status(200).send({ status: true, msg: userDetails })
      } else {
        res.status(404).send({ status: false, msg: "Invalid UsedId" })
      }
    } else { res.status(404).send({ status: false, msg: "Resource Not Found" }) }
    //console.log(req.token.userId)
  }

  catch (error) {
    res.status(500).send({ status: false, msg: "This is catch" })

  }
};


module.exports.users = users;

//////////////////////////////////////////////////////////////////////////////////////////////////////
//PROBLEM 2-UPDATE EMAIL (PROTECTED API) 
///////////////////////////////////////////////////////////////////////////////////////////////////////

const updateUser = async function (req, res) {
  try {
    let userId = req.params.userId
    let email = req.body.email
    if (req.validToken._id == userId) {
      let userDetails = await userModel.findOneAndUpdate({ _id: userId }, { email: email }, { new: true })
      if (userDetails) {
        res.send({ status: true, msg: userDetails })
      } else {
        res.send({ status: false, msg: "Invalid UsedId" })
      }
    } else { res.status(404).send({ status: false, msg: 'User not found' }) }
  }
  catch (error) { res.status(500).send({ status: false, msg: "Invalid token Id or user Id" }) }
}


module.exports.updateUser = updateUser;
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////







