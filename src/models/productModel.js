const mongoose=require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const productSchema=new mongoose.Schema({
    name: String,
    category: String,
    price: {type: Number, required: true }    
}, {timestamps: true} )

module.exports=mongoose.model('Product', productSchema)