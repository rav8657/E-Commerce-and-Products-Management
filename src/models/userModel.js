// const mongoose = require("mongoose");


// //The details of a user are name(mandatory and unqiue), mobile(mandatory), email(mandatory), password(mandatory) and a isDeleted flag with a default false value

// const userSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true, unique: true },

//     mobile: { type: String, required: true },

//     email: { type: String, required: true },

//     password: { type: String, required: true },

//     isDeleted: { type: Boolean, default: false },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("LoginUser", userSchema);