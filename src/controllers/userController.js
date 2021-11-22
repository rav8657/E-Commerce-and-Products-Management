
//2.  Write a POST api to create a user that takes user details from the request body. If the header isFreeApp is not present terminate the request response cycle with an error message that the request is missing a mandatory header


const userModel = require("../models/userModel");

const createUser = async function (req, res) {
  let userDetails = req.body;
  userDetails.freeAppUser = req.isFreeAppUser;
  let userCreated = await userModel.create(userDetails);
  res.send({ data: userCreated });
};
  module.exports.createUser = createUser;







// const createUsers = async function (req, res) {
//     const users = req.body
//     let savedUser = await UserModel.create(users)
//     res.send({ data: savedUser })
// }
// module.exports.createUsers = createUsers;
