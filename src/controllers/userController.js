const userModel = require("../models/userModel.js");
const jwt = require("jsonwebtoken");



//PROBLEM 1-REGISTER USER
const createUser = async function (req, res) {
  let data= req.body
  let savedData= await userModel.create(data)
  res.send({data: savedData}) 
};

//PROBLEM 2-LOGIN USER
const login = async function (req, res) {
  let userName= req.body.name
  let password= req.body.password

  let credentials = await userModel.findOne({name:userName,password:password,isDeleted:false})

  if(credentials){
          let payload={_id:credentials._id}
          let token = jwt.sign(payload,"radium")
          res.send({status:true,data:credentials._id,token:token})
  }else{
    res.send({msg:"user name not found"})
  }
};

//PROBLEM 3-GET USER DETAILS (PROTECTED API)

const users = async function (req, res) {
  let userId= req.params.userId
  let userDetails= await userModel.findOne({_id:userId,isDeleted:false})
  if(userDetails){
    res.send({status:true,msg: userDetails}) 
  }else{
    res.send({status:false,msg:"userId not Valid"})
  } 
};

//PROBLEM 4-UPDATE EMAIL (PROTECTED API) 

const updateUser = async function (req, res) {
  let userId= req.params.userId
  let email=req.body.email
  let userDetails= await userModel.findOneAndUpdate({_id:userId},{email:email},{new:true})
  if(userDetails){
    res.send({status:true,msg: userDetails}) 
  }else{
    res.send({status:false,msg:"userId not Valid"})
  } 
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


const getUser = async function (req, res) {
  let allUser = await userModel.find();
  res.send({ msg: allUser });
};
module.exports.createUser = createUser;
module.exports.login = login;
module.exports.users = users;
module.exports.updateUser = updateUser;

module.exports.getUser = getUser;